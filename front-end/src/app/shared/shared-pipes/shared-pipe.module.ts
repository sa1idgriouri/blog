import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastPipe } from './cast.pipe';



@NgModule({
	declarations: [
		CastPipe
	],
	exports: [
		CastPipe
	]

})
export class SharedPipesModule { }
