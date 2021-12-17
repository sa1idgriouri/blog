import { Component, ComponentFactory, ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Logger } from 'src/app/core/singletons/logger';

import { ButtonComponent } from '../components/button/button.component';
import { CheckboxGroupComponent } from '../components/checkbox-group/checkbox-group.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { ChipsComponent } from '../components/chips/chips.component';
import { DateComponent } from '../components/date/date.component';
import { DateTimeComponent } from '../components/datetime/datetime.component';
import { FormComponent } from '../components/form/form.component';
import { InputComponent } from '../components/input/input.component';
import { LabelComponent } from '../components/label/label.component';
import { RadiobuttonComponent } from '../components/radiobutton/radiobutton.component';
import { SelectComponent } from '../components/select/select.component';
import { TextAreaComponent } from '../components/text-area/text-area.component';
import { TimeComponent } from '../components/time/time.component';
import { FormControlSchema } from '../models/form-control.schema';

const componentMapper: { [key: string]: any } = {
	label: LabelComponent,
	text: InputComponent,
	number: InputComponent,
	email: InputComponent,
	password: InputComponent,
	button: ButtonComponent,
	submit: ButtonComponent,
	select: SelectComponent,
	radiobutton: RadiobuttonComponent,
	checkbox: CheckboxComponent,
	checkboxgroup: CheckboxGroupComponent,
	date: DateComponent,
	textarea: TextAreaComponent,
	time: TimeComponent,
	datetime: DateTimeComponent,
	chips: ChipsComponent,
	color: InputComponent
};

@Directive({
	selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
	@Input() schema!: FormControlSchema;
	@Input() formComponent!: FormComponent;
	@Input() name!: string;

	componentRef: any;

	constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

	ngOnInit() {
		let factory: ComponentFactory<unknown>;

		if (this.schema.type == "custom" && this.schema.customComponent != undefined)
			factory = this.resolver.resolveComponentFactory(this.schema.customComponent);
		else if (this.schema.type != "custom")
			factory = this.resolver.resolveComponentFactory(componentMapper[this.schema.type.toString()]);
		else
			return;

		this.componentRef = this.container.createComponent(factory);
		this.componentRef.instance.schema = this.schema;
		this.componentRef.instance.name = this.name;
		this.componentRef.instance.formComponent = this.formComponent;
		this.componentRef.location.nativeElement.setAttribute('class', 'df-form-control');
	}
}
