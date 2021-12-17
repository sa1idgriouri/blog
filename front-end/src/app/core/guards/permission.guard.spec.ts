import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionAdapter } from '../models/adapters/role-permission.adapter';
import { RoleAdapter } from '../models/adapters/role.adapter';
import { UserAdapter } from '../models/adapters/user.adapter';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationService } from '../services/navigation.service';
import { PermissionService } from '../services/role-permission.service';

import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
	let guard: PermissionGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [PermissionService, AuthenticationService, NavigationService, UserAdapter, RoleAdapter, PermissionAdapter]
		});
		guard = TestBed.inject(PermissionGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
