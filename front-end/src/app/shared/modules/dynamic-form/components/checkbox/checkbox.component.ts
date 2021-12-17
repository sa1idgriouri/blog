
import { Component, OnInit } from "@angular/core";

import { FormControlComponent } from "../../models/form-control-component";
import { ValidatorService } from "../../services/validator.service";


@Component({
	selector: "df-checkbox",
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent extends FormControlComponent implements OnInit {
	constructor(public validatorService: ValidatorService) { super(); }
	ngOnInit() { }
}