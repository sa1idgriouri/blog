import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SidebarItem } from 'src/app/core/models/sidebar-item';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
	selector: 'app-sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.sass']
})
export class SidebarItemComponent implements OnInit, AfterViewInit {

	@Input() sidebarItem?: SidebarItem;
	@ViewChild("panel") panel?: MatExpansionPanel;

	constructor(private navigationService: NavigationService, private changeDetectionRef: ChangeDetectorRef) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		if (this.sidebarItem?.sidebarItems != undefined && this.navigationService.isRelatedToUrl(this.sidebarItem, this.navigationService.currentUrl)) {
			this.panel?.open();
			this.changeDetectionRef.detectChanges();
		}
	}

}
