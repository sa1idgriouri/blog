import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControlComponent } from '../../models/form-control-component';

@Component({
	selector: 'df-button',
	template: `
		<div [formGroup]="group">
			<button [type]="schema.type" mat-flat-button [themeColor]="(this.schema.theme != undefined || this.schema.type == 'submit') ? this.schema.theme || 'primary' : undefined" (click)="onClick($event)" #button>
				{{ schema.label || "&nbsp;" }}
			</button>
		</div>
	`,
	styles: [
		`
			button {
				width: 100%;
			}
		`,
	],
})
export class ButtonComponent extends FormControlComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('button') button!: HTMLButtonElement;

	constructor(private changeDetectorRef: ChangeDetectorRef) { super(); }

	ngOnInit() {
		// if (this.schema.type == 'submit')
		// 	this.group.valueChanges.subscribe((_) => {
		// 		this.button.disabled = this.group.invalid || this.group.disabled;
		// 	});
	}

	ngAfterViewInit(): void {
		// if (this.schema.type == 'submit') {
		// 	this.button.disabled = this.group.invalid;
		// 	this.changeDetectorRef.detectChanges();
		// }
	}

	onClick($event: Event) {
		this.formComponent.buttonClick.emit({ name: this.name, source: this.group.controls[this.name] });
	}

	ngOnDestroy() {
	}
}
