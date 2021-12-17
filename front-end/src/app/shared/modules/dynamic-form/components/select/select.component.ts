
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Query, QueryList } from "@angular/core";

import { FormControlComponent } from "../../models/form-control-component";
import { ValidatorService } from "../../services/validator.service";


@Component({
	selector: "df-select",
	templateUrl: './select.component.html',
	styles: []
})
export class SelectComponent extends FormControlComponent implements AfterViewInit {
	// public syncfusionFormatOptions?: { text: string, value: any }[];

	constructor(public validatorService: ValidatorService, private changeDetectorRef: ChangeDetectorRef) { super(); }

	ngAfterViewInit(): void {
		// this.syncfusionFormatOptions = [];

		// if (this.schema != undefined && this.schema.options != undefined) {

		// 	Object.keys(this.schema.options).forEach(key => {
		// 		if (this.schema != undefined && this.schema.options != undefined)
		// 			this.syncfusionFormatOptions?.push({ text: key, value: this.schema.options[key], })
		// 	})

		// }
	}

	onSelectChange($event: Event) {
		if (this.schema.options != undefined) {
			let key = ($event.target as HTMLSelectElement).value;
			this.formControl.patchValue(this.schema.options[key]);
		}

	}

}