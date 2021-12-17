import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedDirectivesModule } from '../shared-directives/shared-directive.module';
import { SharedPipesModule } from '../shared-pipes/shared-pipe.module';

import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
	declarations: [
		SearchBarComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		MatIconModule,
		MatButtonModule,
		MatChipsModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatCardModule,

		SharedPipesModule,
		SharedDirectivesModule,
	],
	exports: [
		SearchBarComponent,
	]

})
export class SharedComponentsModule { }
