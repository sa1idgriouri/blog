import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSession, UserSessionBackend } from 'src/app/features/login/models/user-session.model';
import { environment } from 'src/environments/environment';
import { UserCredential, UserCredentialAdapter } from '../common/user/models/user-credential.model';

import { User, UserAdapter, UserModel } from '../common/user/models/user.model';
import { Trace } from '../decorators/trace.decorator';


@Injectable()
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<UserSession>;
	public currentUser$: Observable<any>;

	constructor(private http: HttpClient, private userAdapter: UserAdapter, private userCredentialAdapter: UserCredentialAdapter) {
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('SESSION_USER')!));
		console.log("this.currentUserSubject", this.currentUserSubject)
		this.currentUser$ = this.currentUserSubject.asObservable();
	}

	public get currentUserValue() {
		return this.currentUserSubject.value;

	}

	public get token(): string | null {
		return this.currentUserSubject.value?.token || null;
	}



	public login(email: string, password: string): Observable<UserSession> {
		const userCrendetial: UserCredential = { email: email, password: password }
		return this.http.post<UserSessionBackend>(`${environment.apiURL}/users/login`, this.userCredentialAdapter.toApi(userCrendetial))
			.pipe(map((userSessionBackend: UserSessionBackend) => {
				let userSession: UserSession = {
					email: userSessionBackend.Email,
					role: userSessionBackend.Role,
					token: userSessionBackend.Token
				}
				console.log("SESSION_USER", userSessionBackend)
				localStorage.setItem('SESSION_USER', JSON.stringify(userSession));
				this.currentUserSubject.next(userSession);


				console.log("SESSION_USER", userSession)
				return userSession;
			}));
	}

	// public loadUserData(): Observable<any> {
	// 	if (this.token == undefined)
	// 		throw new Error("Attempt to load user data while there is no token");

	// 	return this.http.get<any>(`${environment.apiUrl}/authentications/${this.token}/user`)
	// 		.pipe(map((userModel: UserModel) => {
	// 			const user: User = this.userAdapter.convertFromApi(userModel)
	// 			localStorage.setItem('currentUser', JSON.stringify(user));
	// 			this.currentUserSubject.next(user);
	// 			return user;
	// 		}));
	// }

	@Trace()
	public logout() {
		// remove user from local storage and set current user to null
		if (this.token != null)
			this.http.post(`${environment.apiURL}/authentications/logout`, this.token).subscribe();

		localStorage.removeItem('SESSION_USER');

		this.currentUserSubject.next(undefined as unknown as UserSession);
	}
}