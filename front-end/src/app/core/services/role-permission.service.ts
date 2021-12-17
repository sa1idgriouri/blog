import { Injectable } from '@angular/core';
import { Trace } from '../decorators/trace.decorator';

import { Role } from '../models/action';
import { UserRole } from '../models/user-role.enum';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class PermissionService {

	constructor(private authenticationService: AuthenticationService) {
	}

	public checkPermission(role: UserRole | UserRole[] | undefined): boolean {
		if (this.authenticationService.currentUserValue == undefined)
			return false;

		if (role == undefined)
			return true;

		if (!Array.isArray(role)) {

			return this.authenticationService.currentUserValue.role === role

		}

		else {
			for (let r of role)
				if (this.authenticationService.currentUserValue.role === r)
					return true;

			return false;
		}
	}
}
