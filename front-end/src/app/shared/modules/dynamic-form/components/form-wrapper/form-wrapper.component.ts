import { Component, EventEmitter, Inject, OnDestroy, Optional, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { FormSchema } from "src/app/shared/modules/dynamic-form/components/form/form.schema";
import { FormSchemaService } from "../../services/form-schema.service";

export enum FormType {
	Insert = 1,
	Update = 2,
	Details = 3,
}

export interface FormComponentData {
	obj: any;
	formType: FormType;
}

@Component({
	template: `<df-form [schema]="formSchema" (submit)="onSubmit($event)"></df-form>`,
})
export class FormWrapperComponent<T> implements OnDestroy {
	@Output() submit: EventEmitter<T> = new EventEmitter();
	public formSchema?: FormSchema;

	protected obj?: T;
	protected formType: FormType;
	protected subscriptions: Subscription[] = [];

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) baseData: FormComponentData, private baseFormSchemaService: FormSchemaService) {
		if (baseData == null) {
			this.obj = undefined;
			this.formType = FormType.Insert;
		} else {
			this.obj = baseData.obj;
			this.formType = baseData.formType;
		}
	}

	ngOnDestroy(): void {
		console.log("FormWrapperComponent ngOnDestroy");
		this.subscriptions.forEach(subscription => { subscription.unsubscribe(); });
	}

	public onSubmit(value: any): void { };
}