import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { count, map, pairwise, startWith } from "rxjs/operators";

import { ClickEventArgs, ValueChangedEventArgs } from '../../models/event-args';
import { FormControlSchema } from '../../models/form-control.schema';
import { FormSchema } from './form.schema';
import { ValidatorService } from '../../services/validator.service';

import { Trace } from 'src/app/core/decorators/trace.decorator';
import { Logger } from 'src/app/core/singletons/logger';
import { relativeTimeRounding } from 'moment';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBehaviorSchema } from '../../models/form-behavior-schema';
import { DynamicFieldDirective } from '../../directives/dynamic-field.directive';

@Component({
	selector: 'df-form',
	template: `
		<ng-container *ngIf="formGroup != undefined && schema != undefined">
			<form [formGroup]="formGroup" (submit)="onSubmit($event)" [ngClass]="responsive ? 'responsive' : ''" #form>
				<ng-container *ngFor="let sortedControl of sortedControls">
				<ng-container *ngIf="sortedControl.isVisible" dynamicField
					[schema]="sortedControl.schema"
					[name]="sortedControl.name"
					[formComponent]="this">
					</ng-container>
				</ng-container>
					
				
			</form>
		</ng-container>
	`,
	host: { 'class': 'df-form' },
	styleUrls: ['./form.component.sass'],
})
export class FormComponent {
	@Input() responsive: boolean = true;

	@Output() valueChanged: EventEmitter<ValueChangedEventArgs> = new EventEmitter<ValueChangedEventArgs>();
	@Output() buttonClick: EventEmitter<ClickEventArgs> = new EventEmitter<ClickEventArgs>();
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();

	@ViewChild("form") form?: ElementRef;
	@ViewChildren(DynamicFieldDirective) private formControls?: QueryList<DynamicFieldDirective>;

	public formGroup!: FormGroup;

	private _submitted: boolean = false;

	public get submitted(): boolean {
		return this._submitted;
	}

	private _schema?: FormSchema;

	@Input() public set schema(value: FormSchema | undefined) {
		this.sortedControls = [];
		if (this.formGroup != undefined) {

			this.formGroup.clearValidators();
			Object.keys(this.formGroup.controls).forEach(key => {
				this.formGroup.removeControl(key);
			})

			this._schema = undefined;
			this.changeDetectorRef.detectChanges();
		}

		this._schema = value;

		if (this._schema != undefined) {
			this.formGroup = this.generateForm();

			this.generateSortedControls();

			this.changeDetectorRef.detectChanges();

			this.generateControlStyles();
			this.affectStyleToControls();
			this.sortBehaviors();

			this.subscribeToValueChanged();
			this.schema?.behaviors?.forEach(behavior => this.executeBehavior(behavior));
			this.changeDetectorRef.detectChanges();
		}
	}

	public get schema(): FormSchema | undefined {
		return this._schema;
	}

	public get value(): any {
		return this.formGroup?.getRawValue();
	}

	private static count: number = 0;
	private id: number;

	public sortedControls: Array<{ name: string; schema: FormControlSchema; isVisible: boolean, isEnabled: boolean, css: { style: string, class: Array<string> } | undefined }> = [];

	private formValidators: Array<[string, FormBehaviorSchema, ValidatorFn]> = []

	constructor(private utilityService: UtilityService, private formBuilder: FormBuilder, private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef,
		private validatorService: ValidatorService, private renderer: Renderer2) {
		this.id = ++FormComponent.count;
	}

	onSubmit($event: Event) {
		this._submitted = true;
		$event.preventDefault();
		$event.stopPropagation();

		if (this.formGroup.valid) {
			this.submit.emit(this.formGroup.getRawValue());
		} else {
			this.formGroup.markAllAsTouched();
			Logger.getInstance().debug("sorted controls", this.sortedControls.map(sortedControl => {
				return {
					name: sortedControl.name,
					isVisible: sortedControl.isVisible,
					isEnabled: sortedControl.isEnabled,
					ExpectedResult: sortedControl.isEnabled && sortedControl.isVisible,
					ActualResult: this.formGroup.controls[sortedControl.name].enabled
				};
			}));

			Logger.getInstance().debug("Form Value", this.value);
			this.sortedControls.forEach(sortedControl => {
				if (this.formGroup.controls[sortedControl.name].disabled)
					Logger.getInstance().warn(`Error in control ${sortedControl.name} enabled: ${this.formGroup.controls[sortedControl.name].enabled}`, this.formGroup.controls[sortedControl.name].errors);
			})
		}
	}

	public loadValues(values: { [key: string]: any }) {
		if (this.formGroup != undefined) {
			this.formGroup.patchValue(values);
			//this.changeDetectorRef.detectChanges();
		}
	}

	private generateForm(): FormGroup {
		if (this.schema == undefined)
			throw new Error("Form schema is undefined");

		const updateOn: 'change' | 'submit' = this.schema.type == "registration" ? 'change' : 'submit';

		const group = this.formBuilder.group({}, { updateOn: updateOn });
		Object.keys(this.schema.controls).forEach((key: string) => {
			const formControlSchema = this.schema?.controls[key];
			if (formControlSchema == null)
				throw new Error(`Form Control name '${key}' not found in Form Schema`);

			group.addControl(key, this.generateFormControl(formControlSchema));
		});

		this.generateFormValidators();

		return group;
	}

	private generateFormControl(formControlSchema: FormControlSchema): AbstractControl {
		if (this.schema == undefined)
			throw new Error("Form schema is undefined");

		const value = formControlSchema.value;
		const enabled = formControlSchema.enabled;

		let control: AbstractControl;

		if (formControlSchema.type != 'checkboxgroup')
			control = this.formBuilder.control(value, this.generateValidator(formControlSchema), this.generateAsyncValidator(formControlSchema));
		else {
			const values = formControlSchema.value != undefined ? (Array.isArray(formControlSchema.value) ? formControlSchema.value : [formControlSchema.value]) : [];
			const options = formControlSchema.options || [];
			control = this.formBuilder.group({});

			for (let key of Object.keys(options))
				(control as FormGroup).addControl(options[key], new FormControl(values.indexOf(options[key]) >= 0));

			control.setValidators(this.generateValidator(formControlSchema));
			control.updateValueAndValidity();
		}

		if (enabled == false)
			control.disable();

		return control;
	}

	private generateValidator(formControlSchema: FormControlSchema): ValidatorFn | [] {
		let validators: ValidatorFn[] = this.validatorService.composeValidator(formControlSchema);
		return Validators.compose(validators) || [];
	}

	private generateAsyncValidator(formControlSchema: FormControlSchema): AsyncValidatorFn | [] {
		let validators: AsyncValidatorFn[] = this.validatorService.composeAsyncValidator(formControlSchema);
		return Validators.composeAsync(validators) || [];
	}

	private generateFormValidators() {
		this.formValidators = [];

		if (this.schema?.behaviors)
			for (let behavior of this.schema?.behaviors) {
				if (behavior.type != "validation")
					continue;

				let randomString = this.utilityService.newGuid();

				let validatorFn = (control: AbstractControl): { [key: string]: any } | null => {
					let error: { [key: string]: any } = {};
					error[randomString] = behavior.errorMessage;
					return error;
				}

				this.formValidators.push([randomString, behavior, validatorFn]);

				if (behavior.controls)
					for (let formControlName of behavior.controls) {
						let control = this.schema.controls[formControlName];
						if (control.errorMessages == undefined)
							control.errorMessages = {};

						control.errorMessages[randomString] = behavior.errorMessage || "";
					}

			}
	}

	private generateSortedControls() {
		if (this._schema == undefined)
			return;

		this._schema.grid.forEach(row => row.forEach(cell => {
			let name: string | null = null;

			if (typeof cell === "string")
				name = cell;

			else if (cell?.name != undefined)
				name = cell.name;

			if (name != null && this._schema != undefined)
				this.sortedControls.push({ name: name, schema: this._schema.controls[name], isVisible: true, isEnabled: this._schema.controls[name].enabled || true, css: undefined });
		}))
	}

	private generateControlStyles() {
		if (this.schema == undefined)
			throw new Error("Form schema is undefined");

		var form = this.form?.nativeElement;
		var fieldCount = Object.keys(this.schema.controls).length;
		var rowColumns: number[] = []
		var highestNumberOfColumnsInRow = 0;
		var highestColumnSize = 0;

		let grid: Array<Array<{ name: string | null, ratio: number }>>;

		grid = this.schema.grid.map(row =>
			row.map(cell => {
				if (cell == null)
					return { name: cell, ratio: 1 };

				else if (typeof cell === "string")
					return { name: cell, ratio: 1 };

				return cell;
			})
		)

		grid.forEach(row => {
			var rowColumnCount = row.reduce((previousValue, value) => previousValue + value.ratio, 0);
			rowColumns.push(rowColumnCount);

			if (highestNumberOfColumnsInRow < rowColumnCount)
				highestNumberOfColumnsInRow = rowColumnCount;

			var currentHighestColumnSize = Math.max(row.reduce((a, b) => a.ratio < b.ratio ? b : a).ratio);

			if (highestColumnSize < currentHighestColumnSize)
				highestColumnSize = currentHighestColumnSize;
		});

		let scalaredGrid: Array<number[]> = []

		var fieldIndex: number = 0;

		const gridColumnCount = this.utilityService.leastCommonMultiple(rowColumns);
		form.style.gridTemplateColumns = "repeat(" + gridColumnCount + ", minmax(0, 1fr))";

		for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
			let scalaredRow: number[] = [];
			for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
				let width: number = grid[rowIndex][columnIndex].ratio;

				if (grid[rowIndex][columnIndex].name == null)
					width = Math.abs(width) * -1;

				scalaredRow.push(Math.round(width / rowColumns[rowIndex] * gridColumnCount));

				if (fieldIndex == fieldCount)
					break;
			}
			scalaredGrid.push(scalaredRow);
		}

		let controlIndex: number = 0;

		for (let rowIndex = 0; rowIndex < scalaredGrid.length; rowIndex++) {
			let currentCellPosition: number = 1;
			let names: string[] = [];
			for (let columnIndex = 0; columnIndex < scalaredGrid[rowIndex].length; columnIndex++) {
				const width: number = scalaredGrid[rowIndex][columnIndex];

				if (width > 0) {
					const endColumn: number = currentCellPosition + width;

					let style: string = "grid-column: " + currentCellPosition + "/" + endColumn;
					let cssClass: Array<string> = [];

					if (currentCellPosition == 1)
						cssClass.push("first");

					if (endColumn == gridColumnCount + 1)
						cssClass.push("last");

					for (let index = currentCellPosition; index < endColumn; index++)
						names.push(this.sortedControls[controlIndex].name);

					this.sortedControls[controlIndex++].css = { style: style, class: cssClass };
				}

				currentCellPosition += Math.abs(width);
			}
		}
	}

	private affectStyleToControls() {
		if (this.schema == undefined)
			return;

		this.changeDetectorRef.detectChanges();

		let controls = this.form?.nativeElement.querySelectorAll(':scope > .df-form-control');

		let indexStart: number = 0;// controls.length - Object.keys(this.schema.controls).length; // we skip the old dom 

		let index = 0;

		this.sortedControls.filter(control => control.isVisible).forEach(control => {
			//console.log(`index: ${index}: `, controls[indexStart + index]);
			this.renderer.setAttribute(controls[indexStart + index], "style", control.css?.style || "")
			control.css?.class.forEach(cssClass => this.renderer.addClass(controls[indexStart + index], cssClass));
			index++;
		})

	}

	private sortBehaviors() {
		if (this.schema?.behaviors == undefined)
			return;

		this.schema.behaviors = this.schema.behaviors.sort((a, b) => {
			if (a.type == "visibility")
				return 1;

			if (a.type == "enability" && (b.type == "enability" || b.type == "instruction" || b.type == "validation"))
				return 1;

			if (a.type == "instruction" && (b.type == "instruction" || b.type == "validation"))
				return 1;

			if (a.type == "validation" && b.type == "validation")
				return 1;

			return -1;
		})
	}

	private subscribeToValueChanged(): void {
		if (this.schema == undefined)
			throw new Error("Form schema is undefined");

		Object.keys(this.formGroup.controls).forEach(formControlName => {
			const formControl = this.formGroup.controls[formControlName];

			formControl.valueChanges.pipe(

				startWith(formControl.value), pairwise()).subscribe(([prev, next]: [any, any]) => {

					if (prev === next)
						return;

					const fieldEventArgs: ValueChangedEventArgs = {
						name: formControlName,
						source: formControl,
						oldValue: prev,
						newValue: next
					};

					const behaviors = this.schema?.behaviors?.filter(behavior => behavior.triggers.some(controlName => controlName == formControlName));
					if (behaviors != undefined && behaviors.length > 0) {
						behaviors.map(behavior => this.executeBehavior(behavior));
						this.affectStyleToControls();
					}

					this.valueChanged.emit(fieldEventArgs);
				})
		});
	}

	private executeBehavior(behavior: FormBehaviorSchema) {
		let condition: string;
		let result: any;

		let formControls: Array<AbstractControl> = Object.values(this.formGroup.controls);

		switch (behavior.type) {
			case "visibility":
				if (behavior.condition == undefined || behavior.controls == undefined)
					return;

				condition = this.parseCode(behavior.condition);
				result = eval(condition);

				Object.keys(this.formGroup.controls).filter(formControlName => behavior.controls?.some(behaviorFormControlName => behaviorFormControlName == formControlName)).forEach(formControlName => {
					let sortedControl = this.sortedControls.filter(control => formControlName == control.name)[0]

					if (result == true) {
						//this.renderer.setStyle(formControl.componentRef.location.nativeElement, "display", "inherit");
						sortedControl.isVisible = true;

						if (sortedControl.isEnabled)
							this.formGroup.controls[formControlName].enable();
					}
					else {
						sortedControl.isVisible = false;
						this.formGroup.controls[formControlName].disable()
					}
				});

				break;

			case "instruction":
				if (behavior.instruction != undefined) {
					if (behavior.condition != undefined) {
						const condition = this.parseCode(behavior.condition);
						const result = eval(condition);

						if (result == false)
							return;
					}

					const instruction = this.parseCode(behavior.instruction);
					eval(instruction);
				}
				break;

			case "enability":
				if (behavior.condition == undefined || behavior.controls == undefined)
					return;

				condition = this.parseCode(behavior.condition);
				result = eval(condition);

				Object.keys(this.formGroup.controls).filter(formControlName => behavior.controls?.some(behaviorFormControlName => behaviorFormControlName == formControlName)).forEach(formControlName => {
					let sortedControl = this.sortedControls.filter(control => formControlName == control.name)[0]

					if (result == true)
						sortedControl.isEnabled = true;
					else
						sortedControl.isEnabled = false;

					if (sortedControl.isEnabled && sortedControl.isVisible)
						this.formGroup.controls[formControlName].enable();
					else
						this.formGroup.controls[formControlName].disable();
				});
				break;

			case "validation":
				if (behavior.condition == undefined || behavior.controls == undefined)
					return;

				condition = this.parseCode(behavior.condition);
				result = eval(condition);

				Object.keys(this.formGroup.controls).filter(formControlName => behavior.controls?.some(behaviorFormControlName => behaviorFormControlName == formControlName)).forEach(formControlName => {
					let control = this.formGroup.get(formControlName);

					if (this.schema == undefined || this.schema.behaviors == undefined)
						throw new Error("Expected schema behaviors to not be undefined");

					let validatorTuple = this.formValidators.find(formValidator => formValidator[1] == behavior);

					if (validatorTuple == undefined)
						throw new Error("Expected validator tuple to not be undefined");

					let validatorFn = validatorTuple[2];

					if (result == true)
						control?.removeValidators(validatorFn);

					else
						control?.addValidators(validatorFn);

					control?.updateValueAndValidity();
				});

		}

		// let names: string[] = [];

		// Object.keys(this.formGroup.controls).forEach(formControlName => {
		// 	if (this.formGroup.controls[formControlName].enabled)
		// 		names.push(formControlName);
		// })

		// Logger.getInstance().debug("enabled form controls", names);
	}


	private parseCode(x: string) {
		const str = x.replace(/{{/g, "this.formGroup.controls['").replace(/}}/g, "']");
		return str;
	}

	// public trackBy(index: number, item: FormControlSchema) {
	// 	return item.name;
	// }
}
