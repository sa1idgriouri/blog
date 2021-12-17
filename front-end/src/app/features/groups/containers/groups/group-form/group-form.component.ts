import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, switchMap } from 'rxjs/operators';
import { Group } from 'src/app/core/common/group/models/group.model';
import { GroupService } from 'src/app/core/common/group/services/group.service';
import { CrudAction } from 'src/app/core/models/crud.enum';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormType, FormWrapperComponent } from 'src/app/shared/modules/dynamic-form/components/form-wrapper/form-wrapper.component';
import { FormSchema } from 'src/app/shared/modules/dynamic-form/components/form/form.schema';
import { FormConfig } from 'src/app/shared/modules/dynamic-form/models/form-config';
import { FormSchemaService } from 'src/app/shared/modules/dynamic-form/services/form-schema.service';
import { GROUP_FORM_SCHEMA } from '../../../models/group.form-schema';

@Component({
	selector: 'app-group-form',
	templateUrl: './group-form.component.html',
	styleUrls: ['./group-form.component.sass']
})
export class GroupFormComponent extends FormWrapperComponent<Group> {
	private subject: Subject<string>;

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) data: any, private formSchemaService: FormSchemaService, private groupService: GroupService, private utilityService: UtilityService) {
		super(data, formSchemaService);
		let formConfig: FormConfig = {};
		let afterGenerate: (formSchema: FormSchema) => void;

		this.subject = new Subject();

		let observable = this.subject.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			switchMap(value => { return this.groupService.checkGroupNameAvailability(value); }),
			first()
		)

		let checkGroupNameAvailabilityFunc = (control: AbstractControl) => {
			if (this.obj?.name != undefined && this.utilityService.stringEqual(control.value, this.obj?.name))
				return of(true);

			setTimeout(() => { this.subject.next(control.value); }, 0);
			return observable;
		}

		if (this.formType == FormType.Insert)
			formConfig.submit = "Ajouter";
		else if (this.formType == FormType.Update)
			formConfig.submit = "Modifier";

		afterGenerate = (formSchema: FormSchema) => {
			if (this.formType == FormType.Insert)
				formSchema.controls["submit"].theme = "success";

			else if (this.formType == FormType.Update)
				formSchema.controls["submit"].theme = "warning";

			else if (this.formType == FormType.Details)
				Object.values(formSchema.controls).forEach(formControlSchema => formControlSchema.enabled = false);

			if (this.formType == FormType.Insert || this.formType == FormType.Update) {
				formSchema.controls["name"].customAsyncValidations = { "checkNameAvailability": checkGroupNameAvailabilityFunc }
				formSchema.controls["name"].errorMessages = { "checkNameAvailability": "Ce nom est déjà utilisé" }
			}

			if (this.formType == FormType.Update || this.formType == FormType.Details) {
				formSchema.controls["name"].value = this.obj?.name;
				formSchema.controls["acronym"].value = this.obj?.acronym;
			}
		}

		this.formSchema = this.formSchemaService.generate(GROUP_FORM_SCHEMA, formConfig, afterGenerate);
	}

	ngOnInit(): void {
	}

	public onSubmit(value: any) {
		const group: Group = {
			id: 0,
			name: value.name,
			acronym: value.acronym,
		}

		if (this.obj) {
			group.id = this.obj.id;
		}

		this.submit.emit(group);
	}

}
