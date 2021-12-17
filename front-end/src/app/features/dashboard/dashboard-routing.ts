import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { Role } from 'src/app/core/models/action';
import { UserRole } from 'src/app/core/models/user-role.enum';

import { DashboardComponent } from './containers/dashboard/dashboard.container';
//canActivate: [PermissionGuard], data: { action: Role.Admin }
const routes: Routes = [
	{ path: '', component: DashboardComponent, canActivate: [PermissionGuard], data: { action: UserRole.ADMIN } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
