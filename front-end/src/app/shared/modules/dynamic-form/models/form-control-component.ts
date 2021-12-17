import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import { Trace } from "src/app/core/decorators/trace.decorator";
import { Logger } from "src/app/core/singletons/logger";
import { FormComponent } from "../components/form/form.component";
import { FormControlSchema } from "./form-control.schema";

export class FormControlComponent {
	public schema!: FormControlSchema;
	public formComponent!: FormComponent;
	public name!: string;

	public ObjectKeys = Object.keys;

	public get group(): FormGroup {
		return this.formComponent.formGroup;
	}

	public get formControl(): AbstractControl {
		const formControl = this.formComponent.formGroup.get(this.name);

		if (formControl == null)
			throw new Error("Form control is null");

		return formControl;
	}

	public set formControl(value: AbstractControl) {
		if (value != null)
			this.formComponent.formGroup.setControl(this.name, value);
	}

	public getErrors(): any[] {
		let errors: any[] = [];

		if (this.formControl?.errors == undefined || this.formControl?.errors == null)
			return [];

		Object.keys(this.formControl?.errors).forEach(keyError =>
			errors.push({ [keyError]: this.formControl?.errors ? this.formControl?.errors[keyError] : "" })
		);

		return errors;
	}

	public isRequired(): boolean {
		return this.schema.required == true;
	}

	public hasMaxLength(): boolean {
		return this.schema.maxLength != undefined;
	}

	public get displayValidIcon(): boolean {
		return this.formComponent.schema?.type == 'registration' && this.formControl.valid && this.formComponent.submitted
	}

	public get displayPendingIcon(): boolean {
		return this.formComponent.schema?.type == 'registration' && this.formControl.pending;
	}

	public get displayInvalidIcon(): boolean {
		return this.formComponent.schema?.type == 'registration' && this.formControl.invalid && this.formControl.touched == true && this.formControl.enabled;
	}

	// public isRequired(): boolean {
	//     // const required: boolean = this.schema.validations?.some(validation => validation.validation == Validators.required) || false;
	//     // return required;
	// 	return this.schema.required == true;
	// }

	// public hasMaxLength(): boolean {
	//     return this.schema.validations?.some(validation => validation.validation.toString() == Validators.maxLength(256).toString()) || false;
	// }
}