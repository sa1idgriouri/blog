import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardComponent } from './containers/dashboard/dashboard.container';
import { DashboardRoutingModule } from './dashboard-routing';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,

    MatCardModule
  ]
})
export class DashboardModule { }
