import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent, MatChipListChange } from '@angular/material/chips';
import { filter, map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { FormControlComponent } from '../../models/form-control-component';
import { ValidatorService } from '../../services/validator.service';
import { Observable } from 'rxjs';
import { AutoComplete, ChangeEventArgs, MultiSelect, RemoveEventArgs, SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Logger } from 'src/app/core/singletons/logger';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Trace } from 'src/app/core/decorators/trace.decorator';

@Component({
	selector: 'df-chips',
	templateUrl: './chips.component.html',
	styleUrls: ['./chips.component.sass']
})
export class ChipsComponent extends FormControlComponent implements OnInit {

	public selectedItems: string[] = [];
	public filteredTexts: Observable<string[]>;
	public inputFormControl: FormControl = new FormControl();
	public separatorKeysCodes: number[] = [ENTER, COMMA];

	@ViewChild("input") input?: ElementRef<HTMLInputElement>

	constructor(public validatorService: ValidatorService, private utilityService: UtilityService) {
		super();
		this.filteredTexts = this.inputFormControl.valueChanges.pipe(
			startWith(undefined),
			map((value: string | undefined) => this.updateAutocomplete(value))
		)
	}

	ngOnInit(): void {
	}

	public onAdd($event: MatChipInputEvent) {
		const text: string = ($event.value || "").trim();

		if (text == "")
			return;

		if (this.schema.options != undefined) {
			const filters: string[] = Object.keys(this.schema.options).filter(key => key.toLowerCase() == text.toLowerCase())

			if (filters.length == 0)
				return;

			this.add(filters[0]);
		}
		else
			this.add(text);

		$event.chipInput!.clear();
	}

	public onRemove(text: string) {
		this.remove(text);
	}

	public onChange($event: MatChipListChange) {
		//console.log($event);
	}

	public onSelected($event: MatAutocompleteSelectedEvent) {
		this.add($event.option.viewValue);
	}

	protected updateAutocomplete(value: string | undefined): string[] {

		if (this.schema.options == undefined)
			return [];

		let availableOptions = Object.keys(this.schema.options).filter(key => this.selectedItems.some(text => text == key) == false);

		if (value != undefined) {
			const lowerCaseValue = value.toLowerCase();
			availableOptions = availableOptions.filter(option => option.toLowerCase().includes(lowerCaseValue));
		}

		return availableOptions;
	}

	private add(text: string) {
		let value: any = undefined;

		if (this.schema.options != undefined) {
			if (Object.keys(this.schema.options).indexOf(text) < 0)
				return;
			value = this.schema.options[text];
		}
		else
			value = text;

		let valueArray: Array<any> | undefined = this.formControl?.value;

		if (Array.isArray(valueArray))
			valueArray = [...valueArray, value];
		else
			valueArray = [value];

		this.formControl?.patchValue(valueArray);

		this.selectedItems.push(text);

		if (this.input != undefined) {
			this.inputFormControl.patchValue(undefined);
			this.input.nativeElement.value = "";
		}
	}

	private remove(text: string) {
		this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem != text);

		let value: any = undefined

		if (this.schema.options == undefined)
			value = text;

		else {
			value = this.schema.options[text];
		}

		let formControlValue: Array<any> = this.formControl?.value as Array<any> || [];

		if (formControlValue != undefined) {
			const index = formControlValue.indexOf(value);

			if (index >= 0)
				formControlValue.splice(index, 1);
			else {
				Logger.getInstance().warn(`Error: could not find value of ${text} inside`, formControlValue);
				Logger.getInstance().verbose("Object to remove", value);
			}

			if (formControlValue.length == 0)
				this.formControl?.patchValue(undefined);
			else
				this.formControl?.patchValue(formControlValue);
		}

		if (this.input != undefined) {
			this.inputFormControl.patchValue(undefined);
			this.input.nativeElement.value = "";
		}
	}

}
