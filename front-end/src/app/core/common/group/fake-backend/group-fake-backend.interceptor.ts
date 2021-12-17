import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor } from '@angular/common/http';
import { BaseFakeBackendInterceptor } from 'src/app/core/models/base-fake-backend-interceptor';
import { GroupModel } from '../models/group.model';

import * as groupMock from "./group.mock"

@Injectable()
export class GroupFakeBackendInterceptor extends BaseFakeBackendInterceptor implements HttpInterceptor {

	constructor() {
		super();

		this.methodMocks = [
			{ url: "groups", method: "GET", mock: this.getGroups },
			{ url: "groups", method: "POST", mock: this.addGroup },
			{ url: "groups/:groupId", method: "PUT", mock: this.updateGroup },
			{ url: "groups/:groupId", method: "DELETE", mock: this.deleteGroup },
			{ url: "groups/names/:name", method: "HEAD", mock: this.checkGroupNameAvailability },
		]
	}

	private getGroups(request: HttpRequest<any>) {
		let groups: GroupModel[] = groupMock.groups.map(group => {
			let clone = { ...group };
			clone.CanSeeDetails = true;
			clone.CanUpdate = true;
			clone.CanDelete = false;
			return clone;
		});
		return super.ok(groups);
	}

	private addGroup(request: HttpRequest<any>) {
		let group: GroupModel = request.body;

		group.Id = groupMock.newGroupId();
		groupMock.groups.push(group);

		return super.ok();
	}

	private updateGroup(request: HttpRequest<any>) {
		let group: GroupModel = request.body;
		let groupId = Number.parseInt(request.params.get("groupId") || "-1");

		let groupToUpdate = groupMock.groups.find(group => group.Id == groupId);

		if (groupToUpdate == undefined)
			return super.error(400, "Group not found");

		groupToUpdate.Name = group.Name;
		groupToUpdate.Acronym = group.Acronym;

		return super.ok();
	}

	private deleteGroup(request: HttpRequest<any>) {
		let groupId = Number.parseInt(request.params.get("groupId") || "-1");

		let group = groupMock.groups.find(group => group.Id == groupId);

		if (group == undefined)
			return super.error(400, "Group not found");

		groupMock.groups.splice(groupMock.groups.indexOf(group), 1);

		return super.ok();
	}

	private checkGroupNameAvailability(request: HttpRequest<any>) {
		let name: string | null = request.params.get("name");

		if (name == null)
			return super.error(400, "wrong name");

		let isAvailable: boolean = groupMock.groups.some(group => group.Name.toLowerCase() == name?.toLowerCase()) == false

		return super.ok(isAvailable);
	}

}
