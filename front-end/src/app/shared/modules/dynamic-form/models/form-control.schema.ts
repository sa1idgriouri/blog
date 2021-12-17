import { Component, Type } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { ThemeColor } from "src/app/shared/shared-directives/theme-color.directive";

export interface FormControlSchema {
	type: "text" | "number" | "password" | "email" | "money" | "checkbox" | "checkboxgroup" | "label" | "radiobutton" |
	"select" | "button" | "submit" | "date" | "group" | "custom" | "textarea" | "time" | "datetime" | "chips" | "color";
	label?: string;

	// checkboxgroup and radiobutton
	direction?: "vertical" | "horizontal";
	options?: { [key: string]: any };

	// input fields
	placeholder?: string;
	hint?: string;
	leadingIcon?: string | null;
	value?: any | any[];
	enabled?: boolean;

	// textarea
	rows?: number;

	//label
	size?: "small" | "normal" | "large";

	//button
	theme?: ThemeColor;

	//group
	controls?: FormControlSchema[];

	// validations:
	required?: boolean;
	requiredTrue?: boolean;
	min?: any;
	max?: any;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	match?: string;
	relativeMin?: string;
	relativeMax?: string;
	customValidations?: { [name: string]: ((control: AbstractControl) => boolean) }
	customAsyncValidations?: { [name: string]: ((control: AbstractControl) => Observable<boolean>) }

	// error messages
	errorMessages?: { [key: string]: string };

	// for custom Type
	customComponent?: Type<any>;

	// variable to inject data to components
	data?: { [key: string]: any };
}
