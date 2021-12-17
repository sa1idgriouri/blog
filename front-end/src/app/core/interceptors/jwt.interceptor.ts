import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private authenticationService: AuthenticationService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// add auth header with jwt if user is logged in and request is to the api url
		const user = this.authenticationService.currentUserValue;
		const token = this.authenticationService.token;
		const isLoggedIn = user && token;

		const isApiUrl = request.url.startsWith(environment.apiUrl);
		if (isLoggedIn && isApiUrl) {
			request = request.clone({ setHeaders: { Authorization: `${token}` } });
		}

		return next.handle(request);
	}
}
