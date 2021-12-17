import { Component, Inject, InjectionToken, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ThemeColor } from 'src/app/shared/shared-directives/theme-color.directive';

export const DIALOG_HEADER_DATA = new InjectionToken<{}>('DIALOG_HEADER_DATA');

@Component({
	selector: 'app-dialog-header',
	templateUrl: './dialog-header.component.html',
	styleUrls: ['./dialog-header.component.sass'],
	host: {
		"mat-dialog-title": "",
		"class": "mat-dialog-title"
	}
})
export class DialogHeaderComponent implements OnInit {

	public title?: string;
	public color?: ThemeColor;

	private dialog?: MatDialogRef<any>;

	constructor(@Optional() @Inject(DIALOG_HEADER_DATA) data: any, private moduleDialog: MatDialog) {
		if (data != undefined) {
			this.title = data.title;
			this.color = data.color;
			this.dialog = data.dialog;
		}

	}

	closeDialog() {
		if (this.dialog)
			this.dialog.close();
		else
			this.moduleDialog.closeAll();
	}

	ngOnInit(): void {
	}

}
