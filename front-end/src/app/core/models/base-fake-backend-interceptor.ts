import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "../common/user/models/user.model";


import * as equal from "fast-deep-equal";

import * as userMock from "../common/user/fake-backend/user.mock";

export interface MethodMock {
	url: string;
	method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD";
	mock: (request: HttpRequest<any>) => Observable<HttpResponse<any>>;
}

export abstract class BaseFakeBackendInterceptor implements HttpInterceptor {

	protected methodMocks: Array<MethodMock> = [];
	protected user!: UserModel;

	constructor() {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, headers, body, params } = request;
		let noAuthorityUrl = url.replace(environment.apiUrl + "/", "");

		const urlSplit: string[] = noAuthorityUrl.split("/");

		const filter = this.methodMocks.filter(methodMock => {
			if (method != methodMock.method)
				return false;

			const methodMockUrlSplit = methodMock.url.split("/");

			if (urlSplit.length != methodMockUrlSplit.length)
				return false;

			for (let index: number = 0; index < urlSplit.length; index++) {
				if (methodMockUrlSplit[index].startsWith(":"))
					continue;
				else if (methodMockUrlSplit[index] != urlSplit[index])
					return false;
			}

			return true;
		});



		if (filter.length == 0)
			return next.handle(request);

		if (filter[0].url.endsWith("login") == false) {
			const token: string | null = request.headers.get("Authorization");

			if (token == null)
				return throwError({ status: 401, error: { message: 'Unauthorised' } });

			// this.user = userCredentialMock.userTokens[token];

			// if (this.user == undefined)
			// 	return throwError({ status: 401, error: { message: 'Unauthorised' } });
		}

		const methodMockUrlSplit = filter[0].url.split("/");

		let queryParams: HttpParams = request.params;

		for (let index: number = 0; index < methodMockUrlSplit.length; index++)
			if (methodMockUrlSplit[index].startsWith(":")) {
				const paramName: string = methodMockUrlSplit[index].substr(1);
				const paramValue: string = urlSplit[index];
				queryParams = queryParams.append(paramName, paramValue);
			}

		request = request.clone({ params: queryParams });

		return filter[0].mock.apply(this, [request]).pipe(delay(100));
	}

	protected ok(body?: any) {
		if (body == null)
			body = {};

		//if (body ===)
		//body.message = "fake";
		return of(new HttpResponse({ status: 200, body }))
	}

	protected error(status: number, message: any) {
		return throwError({ status: status, error: { message: message } });
	}

	protected unauthorized() {
		return throwError({ status: 401, error: { message: 'Unauthorised' } });
	}

	protected badRequest(message: string) {
		return throwError({ status: 400, error: message })
	}

	protected hasCommonElement<T>(array1: Array<T>, array2: Array<T>): boolean {
		return array1.some(item => array2.includes(item));
	}

	protected flatten<T>(array: T[][]): T[] {
		return ([] as T[]).concat(...array);
	}

	protected deepEqual(x: any, y: any): boolean {
		return equal(x, y);
	}

	protected distinct<T>(array: T[]): T[] {
		let distinct: T[] = [];

		for (let item of array)
			if (distinct.some(distinctItem => equal(distinctItem, item)) == false)
				distinct.push(item);

		return distinct;
	}

}