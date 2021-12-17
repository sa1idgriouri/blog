import { Injectable } from "@angular/core";
import { HttpRequest, HttpInterceptor } from "@angular/common/http";

import { RoleModel } from "./role.model";
import { BaseFakeBackendInterceptor } from "../../models/base-fake-backend-interceptor";

import * as roleMock from "./role.mock";
import * as userMock from "../user/fake-backend/user.mock";


@Injectable()
export class RoleFakeBackendInterceptor extends BaseFakeBackendInterceptor implements HttpInterceptor {

	constructor() {
		super();
		this.methodMocks = [
			{ url: "roles", method: "GET", mock: this.getRoles },
			{ url: "roles", method: "POST", mock: this.addRole },
			{ url: "roles/:roleId", method: "PUT", mock: this.updateRole },
			{ url: "roles/:roleId", method: "DELETE", mock: this.deleteRole },
			{ url: "groups/:groupId/roles/names/:name", method: "HEAD", mock: this.checkRoleNameAvailability }
		]
	}

	private getRoles(request: HttpRequest<any>) {
		return super.ok(roleMock.roles);
	}

	private addRole(request: HttpRequest<any>) {
		let role: RoleModel = request.body;
		role.Id = roleMock.newRoleId();
		roleMock.roles.push(role);
		return super.ok();
	}

	private updateRole(request: HttpRequest<any>) {
		let role: RoleModel = request.body;
		let roleId = Number.parseInt(request.params.get("roleId") || "-1");

		let roleToUpdate = roleMock.roles.find(role => role.Id == roleId);

		if (roleToUpdate == undefined)
			return super.error(400, "Group not found");

		roleToUpdate.Name = role.Name;
		return super.ok();
	}

	private deleteRole(request: HttpRequest<any>) {
		let roleId = Number.parseInt(request.params.get("roleId") || "-1");

		let role = roleMock.roles.find(role => role.Id == roleId);

		if (role == undefined)
			return super.error(400, "Role not found");

		roleMock.roles.splice(roleMock.roles.indexOf(role), 1);

		return super.ok();
	}

	private checkRoleNameAvailability(request: HttpRequest<any>) {
		let groupId: Number = Number.parseInt(request.params.get("groupId") || "-1");
		let name: string | null = request.params.get("name");

		if (name == null)
			return super.error(400, "wrong name");

		let isAvailable: boolean = roleMock.roles.some(role => role.Name.toLowerCase() == name?.toLowerCase()) == false

		return super.ok(isAvailable);
	}

}
