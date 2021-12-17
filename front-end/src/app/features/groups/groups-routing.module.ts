import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './containers/groups/groups.container';

const routes: Routes = [
	{ path: 'new', component: GroupsComponent, },
	{ path: '', component: GroupsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GroupsRoutingModule { }
