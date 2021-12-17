import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor } from '@angular/common/http';

import { User, UserModel } from '../models/user.model';
import { BaseFakeBackendInterceptor } from '../../../models/base-fake-backend-interceptor';

import * as userMock from "./user.mock";
import { Logger } from 'src/app/core/singletons/logger';
import { Trace } from 'src/app/core/decorators/trace.decorator';
import { UserCredentialModel } from '../models/user-credential.model';
import { UserSessionModel } from '../models/user-session.model';

@Injectable()
export class UserFakeBackendInterceptor extends BaseFakeBackendInterceptor implements HttpInterceptor {

	constructor() {
		super();
		this.methodMocks = [
			{ url: "authentications/login", method: "POST", mock: this.login },
			{ url: "authentications/:token/user", method: "GET", mock: this.getUserByToken },
			{ url: "authentications/logout", method: "POST", mock: this.logout },
			{ url: "users", method: "GET", mock: this.getUsers },
			{ url: "users", method: "POST", mock: this.addUser },
		]
	}

	private login(request: HttpRequest<any>) {
		const userCredential = request.body as UserCredentialModel;

		let filter = userMock.users.filter(userDb => userDb.Username == userCredential.Email && userDb.Password == userCredential.Password);

		if (filter.length == 0)
			return super.unauthorized();

		const userDb = filter[0];

		let token: string = "fake-token";
		userDb.Token = token;

		let userSession: UserSessionModel = {
			Id: userDb.Id,
			FirstName: userDb.FirstName,
			LastName: userDb.LastName,
			Token: userDb.Token,
			Email: userDb.Email,
			Role: {
				Id: userDb.Role.Id,
				Name: userDb.Role.Name,
			}
		}

		return super.ok(userSession);
	}

	private logout(request: HttpRequest<any>) {
		const token = request.body;

		let filter = userMock.users.filter(userDb => userDb.Token == token);

		if (filter.length == 0)
			Logger.getInstance().warn("Token not found");
		else
			filter[0].Token = undefined;

		return super.ok();

	}

	private getUserByToken(request: HttpRequest<any>) {
		const token: string | null = request.params.get("token");

		if (token == null)
			return super.error(400, "No token provided")

		let userDb = userMock.users.find(userDb => userDb.Token == token);

		if (userDb == undefined) {
			Logger.getInstance().warn("User with token unfound");
			return super.error(403, "Invalid token");
		}
		else
			return super.ok(userDb);
	}

	private getUsers(request: HttpRequest<any>) {
		return super.ok(userMock.users);
	}

	private addUser(request: HttpRequest<any>) {
		let user: UserModel = request.body;
		if (user.Credential == undefined) {
			return super.error(400, "User has no credential property assigned to");
		}

		user.Id = userMock.newUserId();
		//userMock.users.push(user);

		//userCredentialMock.userCredentials.push({ ...user.Credential, UserId: user.Id })
		return super.ok();
	}
}
