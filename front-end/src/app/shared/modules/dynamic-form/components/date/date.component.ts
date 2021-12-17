import { Component, OnInit } from "@angular/core";

import { ValidatorService } from "../../services/validator.service";
import { FormControlComponent } from "../../models/form-control-component";

;
@Component({
	selector: "df-date",
	templateUrl: './date.component.html',
	styles: []
})
export class DateComponent extends FormControlComponent implements OnInit {
	constructor(public validatorService: ValidatorService) { super(); }

	ngOnInit(): void {
	}
}