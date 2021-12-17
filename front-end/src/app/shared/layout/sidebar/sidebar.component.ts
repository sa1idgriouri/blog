import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/action';
import { ScreenSize } from 'src/app/core/models/screen-size.enum';
import { SidebarItem } from 'src/app/core/models/sidebar-item';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { SidebarMode } from './sidebar-mode.enum';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnDestroy {

	@Input() set mode(sidebarMode: SidebarMode) {
		this.iconMode = sidebarMode == SidebarMode.Icon;
		this.fullMode = sidebarMode == SidebarMode.Full;

		if (sidebarMode == SidebarMode.Icon)
			this.closeAllWithoutAnimation();
	}

	@HostBinding("class.icon-mode") iconMode: boolean = false;
	@HostBinding("class.full-mode") public fullMode: boolean = false;
	@HostBinding('@.disabled') disableAnimation = false;

	@ViewChildren(SidebarItemComponent) sidebarItemComponents?: QueryList<SidebarItemComponent>
	@ViewChild(MatAccordion) accordion?: MatAccordion;

	public sidebarItems: SidebarItem[];
	public eScreenSize = ScreenSize;
	public userNames: string[] = [];
	public role: string = "";

	private subscriptions: Subscription[] = [];

	constructor(
		private navigationService: NavigationService,
		public deviceService: DeviceService,
		private authenticationService: AuthenticationService,
		private utilityService: UtilityService) {

		this.sidebarItems = navigationService.getUserSidebarItems();
		this.subscriptions.push(navigationService.navigationChanged.subscribe(sidebarItem => { this.onNavigationChanged(sidebarItem) }));
		this.subscriptions.push(authenticationService.currentUser$.subscribe(users => {


			if (users == undefined)
				return;



			
		}));
		this.subscriptions.push(this.utilityService.documentMouseDown.subscribe(event => this.onMouseDown(event)));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private onNavigationChanged(sidebarItem: SidebarItem) {
		if (this.iconMode == true)
			this.closeAllWithoutAnimation();
	}

	private onMouseDown($event: any) {
		if (this.iconMode)
			if (!($event.path as Array<HTMLElement>).some(element => element.tagName?.toUpperCase() == "APP-SIDEBAR"))
				this.closeAllWithoutAnimation();
	}

	private closeAllWithoutAnimation() {
		this.disableAnimation = true;
		setTimeout(() => this.disableAnimation = false, 0);
		this.accordion?.closeAll();
	}

}
