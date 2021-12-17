import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';


import { FormControlComponent } from '../../models/form-control-component';

@Component({
	selector: 'df-input',
	templateUrl: './input.component.html',
	styles: [],
})
export class InputComponent extends FormControlComponent implements OnInit, AfterViewInit {
	constructor(public validatorService: ValidatorService) { super(); }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		let hasAdditionalValidation: boolean = false;

		// if (this.schema.type == 'email') {
		// 	if (this.schema.validations == undefined)
		// 		this.schema.validations = [];

		// 	this.schema.validations.push(EMAIL_VALIDATION_SCHEMA);
		// 	hasAdditionalValidation = true;
		// }

		// else if (this.schema.type == 'password') {
		// 	if (this.schema.validations == undefined)
		// 		this.schema.validations = [];

		// 	this.schema.validations.push(PASSWORD_VALIDATION_SCHEMA);
		// 	hasAdditionalValidation = true;
		// }

		// if (hasAdditionalValidation && this.schema.validations != undefined) {
		// 	this.formControl?.setValidators(Validators.compose(this.schema.validations.map(v => v.validation)));
		// 	this.formControl?.updateValueAndValidity();
		// }

	}
}

@Component({
	selector: "[dummy]",
	template: `<h3>{{dummyValue}}</h3>`,
	styles: []
})
export class DummyDummyComponent {
	@Input() dummyValue: string = "";
}
