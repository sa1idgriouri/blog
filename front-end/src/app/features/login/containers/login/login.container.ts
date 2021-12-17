import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Logger } from 'src/app/core/singletons/logger';
import { FormSchema } from 'src/app/shared/modules/dynamic-form/components/form/form.schema';
import { FormSchemaService } from 'src/app/shared/modules/dynamic-form/services/form-schema.service';
import { LOGIN_FORM_SCHEMA } from '../../models/login.form-schema';


@Component({
	selector: 'app-login',
	templateUrl: './login.container.html',
	styleUrls: ['./login.container.sass']
})
export class LoginComponent implements OnInit {
	formSchema: FormSchema;

	public errorMessage: string | undefined;

	constructor(private router: Router, private authenticationService: AuthenticationService, private formSchemaService: FormSchemaService, private navigationService: NavigationService) {
		this.formSchema = formSchemaService.generate(LOGIN_FORM_SCHEMA);

		// if (this.authenticationService.currentUserValue != undefined) {
		// 	let defaultPage: string | undefined = this.navigationService.getDefaultPage();
		// 	if (defaultPage == undefined) {
		// 		Logger.getInstance().warn("User has no default page");
		// 		this.authenticationService.logout();
		// 		return;
		// 	}

		// 	this.router.navigate([defaultPage]);

		// }
	}

	ngOnInit(): void {
	}

	onLoginClick($loginFormValue: any) {
		this.errorMessage = undefined;

		this.authenticationService.login($loginFormValue.username, $loginFormValue.password).subscribe(
			user => {
				if (user != undefined)
					this.router.navigate(['/dashboard']);
			},

			error => {
				this.errorMessage = "Email d'utilisateur ou mot de passe incorrect.";
			}
		);
	}
}
