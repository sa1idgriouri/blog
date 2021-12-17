import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SharedDirectivesModule } from "./shared-directives/shared-directive.module";
import { SharedPipesModule } from "./shared-pipes/shared-pipe.module";
import { SharedComponentsModule } from "./shared-components/shared-components.module";

import { DynamicFormModule } from "./modules/dynamic-form/dynamic-form.module";
import { LayoutModule } from "./layout/layout.module";
import { AlertModule } from "./modules/alert/alert.module";
import { DialogModule } from "./modules/dialog/dialog.module";
import { InterceptorInheritanceModule } from "./modules/interceptor-inheritance/interceptor-inheritance.module";


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		SharedDirectivesModule,
		SharedPipesModule,
		SharedComponentsModule,
		DynamicFormModule,
		LayoutModule,
		AlertModule,
		DialogModule,
	],

	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		SharedDirectivesModule,
		SharedPipesModule,
		SharedComponentsModule,

		DynamicFormModule,
		LayoutModule,
		AlertModule,
		DialogModule,


		//AgendaModule
	],
})

export class SharedModule {
}
