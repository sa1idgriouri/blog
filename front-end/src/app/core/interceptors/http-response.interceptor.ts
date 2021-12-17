import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let response: any;
		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse)
						response = event;
				},
				error => response = error
			),
			finalize(() => {
				let status: number = response.status;

				switch (status) {
					case 401:
						this.authenticationService.logout();
						this.router.navigate(["login"]);
						break;
				}
			})
		);
	}
}
