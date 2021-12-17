import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'src/app/core/singletons/logger';
import { CustomValidator } from '../models/custom-validators';
import { FormControlSchema } from '../models/form-control.schema';

// const errorMessages: { [key: string]: string } = {
// 	required: 'Field required',
// 	requiredTrue: 'Field must be true',
// 	min: 'Value should be >= {0}',
// 	max: 'Value should be <= {0}',
// 	minLength: 'Field should contains at least {0} characters',
// 	maxLength: 'Field should not exceed {0} characters',
// 	email: 'Invalid email format',
// 	pattern: 'Invalid pattern',
// 	match: 'Field does not match'
// };

const errorMessages: { [key: string]: string } = {
	required: 'Champs requis',
	requiredTrue: 'Champs doit être validé',
	min: 'La valeur doit être >= {0}',
	max: 'La valeur doit être <= {0}',
	minLength: 'Le champs doit avoir au moins {0} caractères',
	maxLength: 'Le champs ne doit pas dépasser {0} caractères',
	email: 'Format de l\'e-mail invalide',
	pattern: 'Pattern incorrect',
	match: 'Les champs doivent avoir la même valeur',
	relativeMin: 'La valeur doit être > {0}',
	relativeMax: 'La valeur doit être < {0}',
};


@Injectable()
export class ValidatorService {

	constructor() { }

	public composeValidator(formControlSchema: FormControlSchema): ValidatorFn[] {
		let validators: ValidatorFn[] = [];

		if (formControlSchema.required == true)
			validators.push(this.getValidator('required'));

		if (formControlSchema.requiredTrue == true)
			validators.push(this.getValidator('requiredTrue'));

		if (formControlSchema.min != undefined) {
			Logger.getInstance().debug("formControlSchema.min != undefined", formControlSchema);
			validators.push(this.getValidator('min', formControlSchema.min));
		}

		if (formControlSchema.max != undefined)
			validators.push(this.getValidator('max', formControlSchema.max));

		if (formControlSchema.minLength != undefined)
			validators.push(this.getValidator('minLength', formControlSchema.minLength));

		if (formControlSchema.maxLength != undefined)
			validators.push(this.getValidator('maxLength', formControlSchema.maxLength));

		if (formControlSchema.pattern != undefined)
			validators.push(this.getValidator('pattern', formControlSchema.pattern));

		if (formControlSchema.match != undefined)
			validators.push(this.getValidator('match', formControlSchema.match));

		if (formControlSchema.type == 'email')
			validators.push(this.getValidator('email'));

		if (formControlSchema.relativeMin != undefined)
			validators.push(this.getValidator("relativeMin", formControlSchema.relativeMin));

		if (formControlSchema.relativeMax != undefined)
			validators.push(this.getValidator("relativeMax", formControlSchema.relativeMax));

		Object.keys(formControlSchema.customValidations || {}).forEach(name => {
			if (formControlSchema.customValidations == undefined)
				return;

			let func = formControlSchema.customValidations[name];

			let customValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
				let result: boolean = func(control);

				if (result == true)
					return null;

				let error: { [key: string]: boolean } = {}
				error[name] = true;
				return error;
			};

			validators.push(customValidator)
		})

		return validators as ValidatorFn[];
	}

	public composeAsyncValidator(formControlSchema: FormControlSchema): AsyncValidatorFn[] {
		let validators: AsyncValidatorFn[] = [];

		Object.keys(formControlSchema.customAsyncValidations || {}).forEach(name => {
			if (formControlSchema.customAsyncValidations == undefined)
				return;

			let func = formControlSchema.customAsyncValidations[name];

			let customValidator: AsyncValidatorFn = (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
				let observable = func(control).pipe(map((result: boolean) => {
					if (result == true)
						return null;


					let error: { [key: string]: boolean } = {}
					error[name] = true;
					return error;
				}));

				return observable;
			};

			validators.push(customValidator)
		})

		return validators as AsyncValidatorFn[];
	}

	public getErrorMessage(error: any) {
		const errorType = Object.keys(error)[0]

		let errorMessage: string = errorMessages[errorType];
		let args: any[] = [];

		if (errorType == 'minLength')
			args.push(error.minLength.requiredLength);

		else if (errorType == 'maxLength')
			args.push(error.maxLength.requiredLength);

		else if (errorType == 'min')
			args.push(error.min.min);

		else if (errorType == 'max')
			args.push(error.max.max);

		else if (errorType == 'relativeMin')
			args.push(error.relativeMin.min);

		else if (errorType == 'relativeMax')
			args.push(error.relativeMax.max);

		if (args.length == 0)
			return errorMessage;

		const StringFormat = (str: string, ...args: string[]) =>
			str.replace(/{(\d+)}/g, (match, index) => args[index] || '')

		errorMessage = StringFormat(errorMessage, ...args.map(param => String(param)));

		return errorMessage;
	}

	private getValidator(validatorType: string, arg: any = undefined): ValidatorFn {
		switch (validatorType) {
			case 'required':
				return CustomValidator.required();
			case 'requiredTrue':
				return CustomValidator.requiredTrue();
			case 'min':
				return CustomValidator.min(arg);
			case 'max':
				return CustomValidator.max(arg);
			case 'minLength':
				return CustomValidator.minLength(arg);
			case 'maxLength':
				return CustomValidator.maxLength(arg);
			case 'email':
				return CustomValidator.email();
			case 'pattern':
				return CustomValidator.pattern(arg);
			case 'match':
				return CustomValidator.match(arg);
			case "relativeMin":
				return CustomValidator.relativeMin(arg);
			case "relativeMax":
				return CustomValidator.relativeMax(arg);

		}

		Logger.getInstance().warn('Validator type ' + validatorType + ' unknown');
		return CustomValidator.doNothing();
	}

}
