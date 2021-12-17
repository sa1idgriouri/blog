import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Trace } from 'src/app/core/decorators/trace.decorator';
import { Role } from 'src/app/core/models/action';
import { UserRole } from 'src/app/core/models/user-role.enum';
import { PermissionService } from 'src/app/core/services/role-permission.service';

@Directive({
	selector: '[ifHasAction]'
})
export class IfHasActionDirective implements AfterViewInit {

	@Input() ifHasAction?: UserRole | UserRole[];

	constructor(private elementRef: ElementRef, private rolePermissionService: PermissionService) {
	}

	ngAfterViewInit(): void {
		console.log("IfHasActionDirective  ngAfterViewInit ")
		if (this.ifHasAction != undefined && this.rolePermissionService.checkPermission(this.ifHasAction) == false) {
			this.elementRef.nativeElement.remove();
		}
	}

}
