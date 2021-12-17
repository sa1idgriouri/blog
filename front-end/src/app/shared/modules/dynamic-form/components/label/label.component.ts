import { Component, OnInit } from '@angular/core';

import { FormControlComponent } from '../../models/form-control-component';

@Component({
	selector: 'df-label',
	template: `
		<div [formGroup]="group">
			<label
				[class.small]="schema.size == 'small'"
				[class.norma]="schema.size == 'normal'"
				[class.large]="schema.size == 'large'"
				>{{ schema.label }}</label
			>
		</div>
	`,
	styles: [`
		.small { font-size: 0.5rem; }
		.normal { font-size: 1rem; }
		.large { font-size: 1.5rem; }
	`],
})
export class LabelComponent extends FormControlComponent implements OnInit {
	constructor() { super(); }
	ngOnInit() { }
}
