import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrastDirective } from './contrast.directive';
import { IfHasActionDirective } from './if-has-action.directive';
import { ThemeColorDirective } from './theme-color.directive';

@NgModule({
	declarations: [
		ContrastDirective,
		IfHasActionDirective,
		ThemeColorDirective,
	],
	exports: [
		ContrastDirective,
		IfHasActionDirective,
		ThemeColorDirective,
	]

})
export class SharedDirectivesModule { }
