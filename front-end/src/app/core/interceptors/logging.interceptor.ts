import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Logger } from '../singletons/logger';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const startTime = Date.now();
		let status: "succeeded" | "failed" | "";

		return next.handle(request).pipe(
			tap(
				event => {
					status = '';
					if (event instanceof HttpResponse) {
						status = "succeeded";
					}
				},
				error => status = 'failed'
			),
			finalize(() => {
				const elapsedTime = Date.now() - startTime;
				const message = request.method + " " + request.urlWithParams + " " + status
					+ " in " + elapsedTime + "ms";

				if (status == "succeeded")
					Logger.getInstance().info(message);
				else if (status == "failed")
					Logger.getInstance().error(message);
			})
		);
	}
}

