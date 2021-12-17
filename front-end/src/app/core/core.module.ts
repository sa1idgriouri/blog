import { DEFAULT_CURRENCY_CODE, Injector, LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserFakeBackendInterceptor } from './common/user/fake-backend/user-fake-backend.interceptor';
import { UserCredentialAdapter } from './common/user/models/user-credential.model';
import { UserAdapter } from './common/user/models/user.model';
import { UserService } from './common/user/services/user.service';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { ColorService } from './services/color.service';
import { DeviceService } from './services/device.service';
import { NavigationService } from './services/navigation.service';
import { PermissionService } from './services/role-permission.service';
import { UtilityService } from './services/utility.service';
import { RoleFakeBackendInterceptor } from './common/role/role-fake-backend.interceptor';
import { RoleAdapter } from './common/role/role.model';
import { RoleService } from './common/role/role.service';
import { GroupFakeBackendInterceptor } from './common/group/fake-backend/group-fake-backend.interceptor';
import { GroupAdapter } from './common/group/models/group.model';
import { GroupService } from './common/group/services/group.service';
import { NetworkInterceptor } from './interceptors/network.interceptor';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
	],
	providers: [
		UtilityService,
		AuthenticationService,
		ColorService,
		DeviceService,
		NavigationService,

		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },

		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },

		PermissionService,

		UserAdapter, UserCredentialAdapter,
		UserService,
		{ provide: HTTP_INTERCEPTORS, useClass: UserFakeBackendInterceptor, multi: true },

		RoleAdapter,
		RoleService,
		{ provide: HTTP_INTERCEPTORS, useClass: RoleFakeBackendInterceptor, multi: true },

		GroupAdapter,
		GroupService,
		{ provide: HTTP_INTERCEPTORS, useClass: GroupFakeBackendInterceptor, multi: true },


		{ provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
	],
})
export class CoreModule {
}
