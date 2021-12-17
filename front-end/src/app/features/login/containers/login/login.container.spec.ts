import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionAdapter } from 'src/app/core/models/adapters/role-permission.adapter';
import { RoleAdapter } from 'src/app/core/models/adapters/role.adapter';
import { UserAdapter } from 'src/app/core/models/adapters/user.adapter';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DynamicFormModule } from 'src/app/shared/modules/dynamic-form/dynamic-form.module';

import { LoginComponent } from './login.container';

// describe('LoginComponent', () => {
//     let component: LoginComponent;
//     let fixture: ComponentFixture<LoginComponent>;

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [RouterTestingModule, HttpClientTestingModule],
//             declarations: [LoginComponent],
//             providers: [AuthenticationService, UserAdapter, RoleAdapter, PermissionAdapter],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(LoginComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
