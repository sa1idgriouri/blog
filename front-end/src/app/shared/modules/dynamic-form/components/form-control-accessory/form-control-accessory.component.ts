import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Trace } from 'src/app/core/decorators/trace.decorator';
import { FormControlComponent } from '../../models/form-control-component';
import { FormControlSchema } from '../../models/form-control.schema';
import { ValidatorService } from '../../services/validator.service';
import { FormComponent } from '../form/form.component';

@Component({
	selector: '[df-accessory]',
	templateUrl: './form-control-accessory.component.html',
	styleUrls: ['./form-control-accessory.component.sass']
})
export class FormControlAccessoryComponent extends FormControlComponent implements OnInit {

	@Input() accessorySchema!: FormControlSchema;
	@Input() accessoryControl!: AbstractControl;
	@Input() accessoryFormComponent!: FormComponent;
	@Input() accessoryTo!: FormControlComponent;

	@ViewChild("template", { static: true }) template?: TemplateRef<any>;

	constructor(private viewContainerRef: ViewContainerRef, public validatorService: ValidatorService) {
		super();
	}

	ngOnInit() {
		//if (this.template)
		//	this.viewContainerRef.createEmbeddedView(this.template);
	}

	public get formControl(): AbstractControl {
		return this.accessoryControl;
	}


}
