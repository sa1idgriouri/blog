import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ScreenSize } from 'src/app/core/models/screen-size.enum';
import { DeviceService } from 'src/app/core/services/device.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SidebarMode } from '../sidebar/sidebar-mode.enum';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnDestroy {
	@ViewChild("sidenav") sidenav?: MatSidenav;

	public eScreenSize = ScreenSize;

	private subscriptions: Subscription[] = [];
	private interval?: number;
	private count: number = 0;

	private _isSidebarLocked: boolean = false;
	private _sidebarMode: SidebarMode;

	public get isSidebarLocked(): boolean {
		return this._isSidebarLocked;
	}

	public get sidebarMode(): SidebarMode {
		return this._sidebarMode;
	}

	constructor(public deviceService: DeviceService, private navigationService: NavigationService, private changeDetectorRef: ChangeDetectorRef) {
		this.subscriptions.push(navigationService.navigationChanged.subscribe(sidebarItem => {
			if (deviceService.screenSize < ScreenSize.md)
				this.sidenav?.close();
		}));

		this._sidebarMode = SidebarMode.Full;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	ngOnInit(): void {
	}

	public onToggleSidebarClick($event: Event) {
		if (this.deviceService.screenSize >= ScreenSize.md) {
			if (this.sidebarMode == SidebarMode.Full)
				this._sidebarMode = SidebarMode.Icon;
			else
				this._sidebarMode = SidebarMode.Full;

			// since there is an issue where does sidenav content does not animate when the sidenav size changes because of its child
			// we trigger the detect changes in order to 'simulate' the animation of expanding/shrinking when the sidenav itself is
			// changing its size

			// setTimeout(() => {
			// 	this.sidenav?._container?.updateContentMargins();
			// }, 300);


			this.count = 0
			window.clearInterval(this.interval);

			this.interval = window.setInterval(() => {
				this.sidenav?._container?.updateContentMargins();

				if (++this.count >= 15)
					window.clearInterval(this.interval);
			}, 20);
		}
		else {
			if (this._sidebarMode != SidebarMode.Full)
				this._sidebarMode = SidebarMode.Full;

			this.sidenav?.toggle();

		}
	}

	public lockSidebar() {
		this._isSidebarLocked = true;
	}

	public unlockSidebar() {
		this._isSidebarLocked = false;
	}
}
