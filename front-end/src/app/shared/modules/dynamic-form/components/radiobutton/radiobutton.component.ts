import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControlComponent } from "../../models/form-control-component";
import { FormControlSchema } from "../../models/form-control.schema";
import { ValidatorService } from "../../services/validator.service";

import { FormComponent } from "../form/form.component";

@Component({
	selector: "df-radiobutton",
	templateUrl: './radiobutton.component.html',
	styles: [`
    mat-radio-group.horizontal { display: inline-flex; flex-direction: row; margin-left: 5px }
    mat-radio-group.horizontal mat-radio-button { margin-right: 10px}
    mat-radio-group.vertical { display: flex; flex-direction: column; }
    mat-radio-group.vertical mat-radio-button { margin: 5px }
  `]
})

export class RadiobuttonComponent extends FormControlComponent implements OnInit {
	constructor(public validatorService: ValidatorService) { super(); }
	ngOnInit() {
	}
}