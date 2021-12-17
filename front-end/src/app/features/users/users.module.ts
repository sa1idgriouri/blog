import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './containers/users/users.component';
import { UsersRoutingModule } from './users.routing';
import { ListUsersComponent } from './containers/users/list-users/list-users.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, InterceptorInheritanceModule } from 'src/app/shared/modules/interceptor-inheritance/interceptor-inheritance.module';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { UserFormComponent } from './containers/users/user-form/user-form.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListUsersComponent,
    UserFormComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,



    InterceptorInheritanceModule,


    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [
    UserService,

    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },

  ]
})
export class UsersModule { }
