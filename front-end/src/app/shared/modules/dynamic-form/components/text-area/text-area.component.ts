import { Component, OnInit } from '@angular/core';
import { FormControlComponent } from '../../models/form-control-component';
import { ValidatorService } from '../../services/validator.service';

@Component({
	selector: 'df-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.sass']
})
export class TextAreaComponent extends FormControlComponent implements OnInit {

	constructor(public validatorService: ValidatorService) {
		super();
	}

	ngOnInit(): void {
	}

}
