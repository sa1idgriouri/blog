import { ApplicationRef, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { SidebarItem } from '../models/sidebar-item';
import { PermissionService } from './role-permission.service';

import * as sidebarItemsJson from "src/assets/data/navigation.json";
import { Trace } from '../decorators/trace.decorator';
import { UtilityService } from './utility.service';
import { Role } from '../models/action';
import { MatDialog } from '@angular/material/dialog';
import { Logger } from '../singletons/logger';
import { AuthenticationService } from './authentication.service';
import { UserRole } from '../models/user-role.enum';


const SIDEBAR_ITEMS: SidebarItem[] = [


	{ icon: 'dashboard', text: 'Dashboard', url: '/dashboard' },
	{ icon: 'people', text: 'Users', allowOnly: UserRole.ADMIN, url: '/users' },
	{ icon: "category", text: "Categorys", allowOnly: UserRole.ADMIN, url: '/category ' },
	{ icon: "public", text: "Posts", allowOnly: UserRole.ADMIN, url: '/post ' },
	{ icon: "comment", text: "Comments", allowOnly: UserRole.ADMIN, url: '/comment ' },
	{ icon: "email", text: "Contacts", allowOnly: UserRole.ADMIN, url: '/contact ' }

]

@Trace()
@Injectable()
export class NavigationService implements OnDestroy {

	public navigationChanged: Subject<SidebarItem> = new Subject<SidebarItem>();

	public get currentUrl(): string {
		return this.router?.url || "";
	}

	private subscriptions: Subscription[] = [];

	constructor(private router: Router, private PermissionService: PermissionService, private utilityService: UtilityService, private matDialog: MatDialog, private authenticationService: AuthenticationService) {
		this.subscriptions.push(this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				matDialog.closeAll();


				let currentSidebarItem: SidebarItem | undefined;

				for (let sidebarItem of this.getAllSidebarItems()) {
					currentSidebarItem = this.findSidebarItemWithUrl(sidebarItem, event.urlAfterRedirects);

					if (currentSidebarItem != undefined)
						break;
				}

				// console.log(event.urlAfterRedirects + " => " + currentSidebarItem);

				this.navigationChanged.next(currentSidebarItem);

				// if (this.authenticationService.currentUserValue != undefined)
				// 	this.authenticationService.loadUserData().subscribe(
				// 		user => {

				// 			let currentSidebarItem: SidebarItem | undefined;

				// 			for (let sidebarItem of this.getAllSidebarItems()) {
				// 				currentSidebarItem = this.findSidebarItemWithUrl(sidebarItem, event.urlAfterRedirects);

				// 				if (currentSidebarItem != undefined)
				// 					break;
				// 			}

				// 			// console.log(event.urlAfterRedirects + " => " + currentSidebarItem);

				// 			this.navigationChanged.next(currentSidebarItem);
				// 		},

				// 		error => {
				// 			this.authenticationService.logout();
				// 			this.navigateTo("login");
				// 		}
				// 	)
			}
		})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	public getUserSidebarItems(): SidebarItem[] {
		let sidebarItems: SidebarItem[] = [];
		for (let sidebarItem of this.getAllSidebarItems()) {
			let filteredSidebarItem: SidebarItem | undefined = this.filterSidebarItemByPermission(sidebarItem);
			if (filteredSidebarItem != undefined)
				sidebarItems.push(filteredSidebarItem);
		}

		return sidebarItems;
	}

	public getAllSidebarItems(): SidebarItem[] {
		return SIDEBAR_ITEMS;
	}

	// public getAllSidebarItems(): SidebarItem[] {
	// 	return Array.from(sidebarItemsJson).map(json => {
	// 		return this.mapSidebarItemJsonToObject(json);
	// 	});
	// }

	public getDefaultPage(): string | undefined {
		const permittedSidebarItems = this.getUserSidebarItems();

		if (permittedSidebarItems.length == null)
			return undefined;

		for (let sidebarItem of permittedSidebarItems) {
			let url = this.findFirstPermittedUrl(sidebarItem);
			if (url != undefined)
				return url;
		}

		return undefined;
	}

	public navigateTo(url: string) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		//this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
		this.router.navigate([url],)
		//);
	}

	public isRelatedToUrl(sidebarItem: SidebarItem, url: string): boolean {
		if (sidebarItem.url != undefined)
			return sidebarItem.url == url;
		else if (sidebarItem.sidebarItems != undefined) {
			for (let child of sidebarItem.sidebarItems) {
				const isChildRelatedToUrl: boolean = this.isRelatedToUrl(child, url);
				if (isChildRelatedToUrl)
					return true;
			}
		}

		return false;
	}

	private filterSidebarItemByPermission(sidebarItem: SidebarItem): SidebarItem | undefined {


		if (sidebarItem.url != undefined)
			return this.PermissionService.checkPermission(sidebarItem?.allowOnly) ? this.utilityService.deepCopy(sidebarItem) : undefined;

		else if (sidebarItem.sidebarItems != undefined && sidebarItem.sidebarItems.length > 0) {
			let sidebarItems: SidebarItem[] = [];
			for (let child of sidebarItem.sidebarItems) {
				const sidebarItemChild = this.filterSidebarItemByPermission(child);
				if (sidebarItemChild != undefined)
					sidebarItems.push(sidebarItemChild);
			}

			if (sidebarItems.length == 0)
				return undefined;

			let filteredSidebarItem: SidebarItem = this.utilityService.deepCopy(sidebarItem);
			filteredSidebarItem.sidebarItems = sidebarItems;
			return filteredSidebarItem;
		}

		return undefined;

	}

	private findSidebarItemWithUrl(sidebarItem: SidebarItem, url: string): SidebarItem | undefined {
		if (sidebarItem.url == url || sidebarItem.url + "#" + sidebarItem.fragment == url)
			return sidebarItem;

		if (sidebarItem.sidebarItems != undefined)
			for (let child of sidebarItem.sidebarItems) {
				const foundSidebarItem = this.findSidebarItemWithUrl(child, url);
				if (foundSidebarItem != undefined)
					return foundSidebarItem;
			}

		return undefined;
	}

	private findFirstPermittedUrl(SidebarItem: SidebarItem): string | undefined {
		if (SidebarItem.url != undefined)
			return SidebarItem.url;
		else if (SidebarItem.sidebarItems != undefined) {
			for (let child of SidebarItem.sidebarItems) {
				let url = this.findFirstPermittedUrl(child);
				if (url != undefined)
					return url;
			}
		}
		return undefined;
	}

	// private mapSidebarItemJsonToObject(json: typeof sidebarItemsJson[0]): SidebarItem {
	// 	return {
	// 		text: json.text,
	// 		icon: json.icon,
	// 		url: json.url,
	// 		conditions: Array.isArray(json.conditions) ? Array.from(json.conditions).map(condition => condition as unknown as Role) : json.conditions as unknown as Role,
	// 		sidebarItems: Array.isArray(json.sidebarItems) ? Array.from(json.sidebarItems).map(childJson => this.mapSidebarItemJsonToObject(childJson)) : []
	// 	};
	// }

}
