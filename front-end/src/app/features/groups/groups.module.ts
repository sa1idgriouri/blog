import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { SharedModule } from 'src/app/shared/shared.module';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupFormComponent } from './containers/groups/group-form/group-form.component';
import { GroupListComponent } from './containers/groups/group-list/group-list.component';
import { GroupsComponent } from './containers/groups/groups.container';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		GroupsComponent,
		GroupFormComponent,
		GroupListComponent,
	],
	imports: [
		GroupsRoutingModule,
		SharedModule,

		MatExpansionModule,
		MatButtonModule,
		MatStepperModule,
		MatTableModule,
		MatIconModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatPaginatorModule

	]
})
export class GroupsModule { }
