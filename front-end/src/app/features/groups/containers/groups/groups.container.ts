import { AfterContentInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import { Group } from 'src/app/core/common/group/models/group.model';
import { GroupService } from 'src/app/core/common/group/services/group.service';
import { Role } from 'src/app/core/models/action';
import { CrudAction } from 'src/app/core/models/crud.enum';
import { ScreenSize } from 'src/app/core/models/screen-size.enum';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { PermissionService } from 'src/app/core/services/role-permission.service';
import { Logger } from 'src/app/core/singletons/logger';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { DialogService } from 'src/app/shared/modules/dialog/services/dialog.service';
import { FormComponentData, FormType } from 'src/app/shared/modules/dynamic-form/components/form-wrapper/form-wrapper.component';
import { GroupFormComponent } from './group-form/group-form.component';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.container.html',
	styleUrls: ['./groups.container.sass']
})
export class GroupsComponent implements AfterViewInit, OnDestroy {

	@ViewChild('groupFormExpansionPanel') private groupFormExpansionPanel?: MatExpansionPanel;
	@ViewChild('groupListExpansionPanel') private groupListExpansionPanel?: MatExpansionPanel;

	@ViewChild(GroupFormComponent) groupFormComponent?: GroupFormComponent;

	public disableAnimation: boolean = true;

	public eAction = Role;
	public groups?: Group[];

	private subscriptions: Subscription[] = [];

	constructor(private navigationService: NavigationService, private activatedRoute: ActivatedRoute, private changeDetectionRef: ChangeDetectorRef,
		private groupService: GroupService, private alertService: AlertService, private dialogService: DialogService) {
		this.loadGroupList();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	ngAfterViewInit(): void {
		if (this.navigationService.currentUrl == "/groups/new")
			this.groupFormExpansionPanel?.open();
		else
			this.groupListExpansionPanel?.open();

		this.changeDetectionRef.detectChanges();
		setTimeout(() => {
			this.disableAnimation = false;
			this.changeDetectionRef.detectChanges();
		}, 0);

	}

	private loadGroupList() {
		this.subscriptions.push(this.groupService.getGroups().subscribe(groups => this.groups = groups));
	}

	public onFormSubmit(group: Group) {
		this.subscriptions.push(this.groupService.addGroup(group).subscribe(result => {
			this.navigationService.navigateTo("groups");
			this.alertService.success("Groupe ajouté avec succès", undefined);
		}))
	}

	public onDetailsClick(group: Group) {
		let dialogRef = this.dialogService.open(GroupFormComponent, { data: { obj: group, formType: FormType.Details } as FormComponentData }, false, "Détails du groupe", "info");
	}

	public onUpdateClick(group: Group) {
		let dialogRef = this.dialogService.open(GroupFormComponent, { data: { obj: group, formType: FormType.Update } as FormComponentData }, false, "Modifier le groupe", "warning");

		this.subscriptions.push(dialogRef.componentInstance.submit.subscribe(group => {
			this.subscriptions.push(this.groupService.updateGroup(group).subscribe(_ => {
				dialogRef.close();
				this.loadGroupList();
				this.alertService.success("Groupe modifié avec succès", undefined);
			}))
		}))
	}

	public onDeleteClick(group: Group) {
		this.subscriptions.push(this.alertService.confirm(`Confirmer la suppression du groupe ${group.name}?`, undefined).subscribe((result: boolean) => {
			if (result == true)
				this.subscriptions.push(this.groupService.deleteGroup(group).subscribe(_ => {
					this.loadGroupList();
					this.alertService.success(`Groupe ${group.name} supprimé avec succès`, undefined);
				}))
		}))
	}
}
