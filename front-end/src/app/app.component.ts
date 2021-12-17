import { Component, HostListener } from '@angular/core';
import { UtilityService } from './core/services/utility.service';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`,
	styles: [],
})
export class AppComponent {
	title = 'ERP';

	constructor(private utilityService: UtilityService) {

	}

	@HostListener('document:mousedown', ['$event'])
	onMouseDown(event: any): void {
		this.utilityService.documentMouseDown.next(event);
	}

	// @HostListener('document:mousemove', ['$event'])
	// onMouseMove(event: any): void {
	// 	this.utilityService.documentMouseMove.next(event);
	// }
}
