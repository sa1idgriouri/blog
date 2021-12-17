import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './containers/login/login.container';
import { LoginRoutingModule } from './login-routing';
import { InterceptorInheritanceModule } from 'src/app/shared/modules/interceptor-inheritance/interceptor-inheritance.module';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		SharedModule,

		MatCardModule,
		InterceptorInheritanceModule,

		LoginRoutingModule
	]
})
export class LoginModule { }
