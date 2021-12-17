import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../../../models/action';
import { User, UserAdapter, UserModel } from '../models/user.model';

@Injectable()
export class UserService {

	constructor(private http: HttpClient, private userAdapter: UserAdapter) { }

	public getUsers(): Observable<User[]> {
		return this.http.get<UserModel[]>(`${environment.apiUrl}/users/login`).pipe(map((userModels: UserModel[]) => {
			return userModels.map((userModel: UserModel) => {
				return this.userAdapter.convertFromApi(userModel);
			})
		}));
	}

	public getUsersHavingPermissionTo(actions: Role[]): Observable<User[]> {
		let queryParams: HttpParams = new HttpParams();
		queryParams = queryParams.append("actions", actions.map(action => action.value).toString());

		return this.http.get<UserModel[]>(`${environment.apiUrl}/users/actions`, { params: queryParams }).pipe(
			map((userModels: UserModel[]) => userModels.map(userModel => this.userAdapter.convertFromApi(userModel)))
		);
	}

	public addUser(user: User): Observable<any> {
		return this.http.post("users", this.userAdapter.convertToApi(user));
	}
}
