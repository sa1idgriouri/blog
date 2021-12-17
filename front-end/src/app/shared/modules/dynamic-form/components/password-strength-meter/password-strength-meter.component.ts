import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'df-password-strength-meter',
	templateUrl: './password-strength-meter.component.html',
	styleUrls: ['./password-strength-meter.component.sass']
})
export class PasswordStrengthMeterComponent implements OnInit, OnChanges {
	@Input() password: string = "";

	@Input() minPasswordLength = 8;

	@Output() strengthChange = new EventEmitter<number>();

	passwordStrength: number = 0;

	private prevPasswordStrength = null;

	private defaultColours = [
		'transparent',
		'red',
		'orangered',
		'orange',
		'yellowgreen',
		'green'
	];

	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.password) {
			this.calculatePasswordStrength();
		}
	}

	private calculatePasswordStrength() {
		// TODO validation logic optimization
		const previousPasswordStrenght = this.passwordStrength;

		if (!this.password)
			this.passwordStrength = 0;
		else
			this.passwordStrength = this.score();

		// Only emit the passwordStrength if it changed
		if (previousPasswordStrenght != this.passwordStrength)
			this.strengthChange.emit(this.passwordStrength);
	}

	getMeterFillColor(strength: number) {
		if (!strength || strength < 0 || strength > 5) {
			return this.defaultColours[0];
		}

		return this.defaultColours[strength];
	}

	private score(): number {
		if (this.password.length == 0)
			return 0;

		if (this.password.length < this.minPasswordLength)
			return 1;

		let score = 1;

		// check if at least one character is uppercase
		if (/[A-Z]/.test(this.password))
			score++;

		// // check if at least one character is lowercase
		if (/[a-z]/.test(this.password))
			score++;

		// check if at least one character is digit
		if (/[0-9]/.test(this.password))
			score++;

		// check if at least one character is special
		if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.password))
			score++;

		return score;
	}
}