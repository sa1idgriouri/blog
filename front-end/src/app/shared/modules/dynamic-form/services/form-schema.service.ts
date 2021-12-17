import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormSchema } from '../components/form/form.schema';
import { FormConfig } from '../models/form-config';

@Injectable({
	providedIn: 'root'
})
export class FormSchemaService {

	constructor(private utilityService: UtilityService) {
	}

	public generate(formSchema: FormSchema, config: FormConfig | undefined = undefined, afterGenerate: (formSchema: FormSchema) => void = (formSchema: FormSchema) => { }): FormSchema {
		let schemaCopy: FormSchema = this.utilityService.deepCopy(formSchema);

		if (config != undefined) {
			if (config.submit != undefined) {
				if (config.previousStep != undefined) {
					schemaCopy.controls["previous"] = { type: "button", label: config?.previousStep };
					schemaCopy.controls["submit"] = { type: "submit", label: config?.submit };
					schemaCopy.grid?.push([{ name: null, ratio: 2 }, "previous", "submit"]);
				} else if (config.cancel != undefined) {
					schemaCopy.controls["submit"] = { type: "submit", label: config?.submit };
					schemaCopy.controls["cancel"] = { type: "button", label: config?.submit };
					schemaCopy.grid?.push(["submit", "cancel"]);
				} else {
					schemaCopy.controls["submit"] = { type: "submit", label: config?.submit };
					schemaCopy.grid?.push([{ name: null, ratio: 3 }, "submit"]);
				}
			}

			if (config.nextStep != undefined) {
				if (config.previousStep != undefined) {
					schemaCopy.controls["previous"] = { type: "button", label: config?.previousStep };
					schemaCopy.controls["next"] = { type: "submit", label: config?.nextStep };
					schemaCopy.grid?.push([null, "previous", "next"]);
				} else {
					schemaCopy.controls["next"] = { type: "submit", label: config.nextStep };
					schemaCopy.grid?.push([{ name: null, ratio: 3 }, "next"]);
				}
			}
		}

		if (afterGenerate != undefined)
			afterGenerate(schemaCopy);

		return schemaCopy;
	}



}
