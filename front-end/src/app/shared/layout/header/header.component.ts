import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig, MatDialogRef, MatDialogState, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeviceService } from "src/app/core/services/device.service";
import { ScreenSize } from "src/app/core/models/screen-size.enum";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Observable, Subscription } from "rxjs";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { UserService } from "src/app/features/users/services/user.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnDestroy {
	@Input() enableSidebarToggleButton?: boolean;
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter<any>();
	public eScreenSize = ScreenSize;
	public title: string = "";
	public userFullName: string = "";

	private currentUserSubscription!: Subscription;
	private navigationChangedSubscription: Subscription;

	constructor(
		private dialog: MatDialog,
		public deviceService: DeviceService,
		private navigationService: NavigationService,

		private authenticationService: AuthenticationService, private router: Router,

	) {
		this.navigationChangedSubscription = navigationService.navigationChanged.subscribe((sidebarItem) => (this.title = sidebarItem?.text));


		this.currentUserSubscription = authenticationService.currentUser$.subscribe(user => {
			if (user != undefined)
				this.userFullName = user.email;
		});
	}
	ngOnDestroy(): void {
		this.navigationChangedSubscription.unsubscribe();
		this.currentUserSubscription.unsubscribe();
	}

	logout($event: Event): void {
		this.authenticationService.logout();
		this.router.navigate(["login"]);
	}

	public toggleFullScreen($event: Event) {
		this.deviceService.toggleFullScreen();
	}
}
