import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionAdapter } from 'src/app/core/models/adapters/role-permission.adapter';
import { RoleAdapter } from 'src/app/core/models/adapters/role.adapter';
import { UserAdapter } from 'src/app/core/models/adapters/user.adapter';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PermissionService } from 'src/app/core/services/role-permission.service';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
    let component: MainLayoutComponent;
    let fixture: ComponentFixture<MainLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [MainLayoutComponent],
            providers: [DeviceService, NavigationService, PermissionService, AuthenticationService, UserAdapter, RoleAdapter, PermissionAdapter],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
