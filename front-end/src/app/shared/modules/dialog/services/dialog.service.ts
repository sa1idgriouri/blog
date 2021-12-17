import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ThemeColor } from 'src/app/shared/shared-directives/theme-color.directive';
import { DialogHeaderComponent, DIALOG_HEADER_DATA } from '../dialog-header/dialog-header.component';

@Injectable()
export class DialogService {

	constructor(private dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private applicationRef: ApplicationRef) { }

	public open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>, hasPadding: boolean = false, title: string | undefined = undefined, color: ThemeColor | undefined = undefined): MatDialogRef<T, R> {
		let classes: string[] = [];

		if (config?.panelClass != undefined)
			classes = [...config.panelClass]

		if (hasPadding == false)
			classes.push("no-padding");

		config = {
			...config,
			panelClass: classes,
			autoFocus: false
		};

		let dialogRef = this.dialog.open(component, config);

		if (title != undefined || color != undefined) {

			let dialogHeaderInjector = Injector.create({
				parent: this.injector,
				providers: [
					{ provide: DIALOG_HEADER_DATA, useValue: { title: title, color: color, dialog: dialogRef } }
				]
			})

			let dialogHeaderPortal = new ComponentPortal(DialogHeaderComponent, undefined, dialogHeaderInjector);
			//let currentComponentPortal = dialogRef._containerInstance._portalOutlet.portal as ComponentPortal<typeof component>;
			//this.applicationRef.
			//console.log("before detach");
			//dialogRef._containerInstance._portalOutlet.detach();
			//console.log("after detach");

			dialogRef._containerInstance._portalOutlet.attachComponentPortal(dialogHeaderPortal);
			//dialogRef._containerInstance._portalOutlet.attachComponentPortal(currentComponentPortal);
		}

		return dialogRef;
	}
}
