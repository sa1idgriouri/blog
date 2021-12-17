import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControlComponent } from "../../models/form-control-component";
import { ValidatorService } from "../../services/validator.service";

@Component({
	selector: "df-checkbox-group",
	templateUrl: './checkbox-group.component.html',
	styles: [`
    #checkbox-container.horizontal { margin-left: 5px }
    #checkbox-container.horizontal mat-checkbox { margin-right: 10px}
    #checkbox-container.vertical { display: flex; flex-direction: column; }
    #checkbox-container.vertical mat-checkbox { margin: 5px }
  `]
})

export class CheckboxGroupComponent extends FormControlComponent implements OnInit {

	checkboxGroup!: FormGroup;

	public sortedOptions: Array<{ key: string, value: any }> = [];

	constructor(public validatorService: ValidatorService) { super(); }

	ngOnInit() {
		this.checkboxGroup = this.formControl as FormGroup;

		if (this.schema.options != undefined) {
			Object.keys(this.schema.options).forEach(key => {
				if (this.schema.options != undefined)
					this.sortedOptions.push({ key: key, value: this.schema.options[key] });
			})

			this.sortedOptions.sort((a, b) => (a as any) - (b as any));
		}
	}

	onCheckboxChanged($event: any) {
	}
}