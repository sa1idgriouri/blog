import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from './services/dialog.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { SharedDirectivesModule } from '../../shared-directives/shared-directive.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [
		DialogHeaderComponent
	],
	imports: [
		CommonModule,

		MatToolbarModule,
		MatButtonModule,
		MatIconModule,

		SharedDirectivesModule
	],
	providers: [
		DialogService
	]
})
export class DialogModule { }
