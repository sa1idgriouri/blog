import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/action';
import { UserRole } from '../models/user-role.enum';
import { NavigationService } from '../services/navigation.service';
import { PermissionService } from '../services/role-permission.service';


@Injectable({
	providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
	constructor(private PermissionService: PermissionService, private navigationService: NavigationService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let action: UserRole | UserRole[] = route.data["action"] as UserRole | UserRole[];


		if (this.PermissionService.checkPermission(action))
			return true;

		let defaultPage: string | undefined = this.navigationService.getDefaultPage();

		if (defaultPage != undefined && defaultPage != route.url.join())
			this.navigationService.navigateTo(defaultPage);
		else
			this.navigationService.navigateTo('login');

		return false;
	}

}
