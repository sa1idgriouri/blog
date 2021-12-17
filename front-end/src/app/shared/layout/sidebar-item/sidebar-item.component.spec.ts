import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionAdapter } from 'src/app/core/models/adapters/role-permission.adapter';
import { RoleAdapter } from 'src/app/core/models/adapters/role.adapter';
import { UserAdapter } from 'src/app/core/models/adapters/user.adapter';
;
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PermissionService } from 'src/app/core/services/role-permission.service';

import { SidebarItemComponent } from './sidebar-item.component';

describe('SidebarItemComponent', () => {
    let component: SidebarItemComponent;
    let fixture: ComponentFixture<SidebarItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [SidebarItemComponent],
            providers: [NavigationService, PermissionService, AuthenticationService, UserAdapter, RoleAdapter, PermissionAdapter],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
