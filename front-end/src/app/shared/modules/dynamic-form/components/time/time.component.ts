import { Component, OnInit } from "@angular/core";
import { FormControlComponent } from "../../models/form-control-component";
import { ValidatorService } from "../../services/validator.service";


@Component({
	selector: "app-time",
	templateUrl: "./time.component.html",
	styleUrls: ["./time.component.sass"]
})
export class TimeComponent extends FormControlComponent implements OnInit {
	constructor(public validatorService: ValidatorService) {
		super();
	}

	ngOnInit(): void { }
}
