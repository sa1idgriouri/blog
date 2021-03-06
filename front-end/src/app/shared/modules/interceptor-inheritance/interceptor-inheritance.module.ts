import { HTTP_INTERCEPTORS as BASE_HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpInterceptor, ÉµHttpInterceptingHandler } from '@angular/common/http';
import { InjectionToken, Injector, NgModule } from '@angular/core';

export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS');

@NgModule({
	providers: [
		{ provide: HttpClient, useClass: HttpClient },
		{ provide: HttpHandler, useClass: ÉµHttpInterceptingHandler },
		{
			provide: BASE_HTTP_INTERCEPTORS, deps: [Injector, HTTP_INTERCEPTORS], useFactory: (injector: any, interceptors: any) => [
				...injector.parent.get(BASE_HTTP_INTERCEPTORS),
				...interceptors
			]
		}]
})
export class InterceptorInheritanceModule {
}