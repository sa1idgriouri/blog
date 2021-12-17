import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role, RoleAdapter, RoleModel } from 'src/app/core/common/role/role.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoleService {

	constructor(private http: HttpClient, private roleAdapter: RoleAdapter) { }

	public getRoles(): Observable<Role[]> {
		return this.http.get<RoleModel[]>(`${environment.apiUrl}/roles`)
			.pipe(map((roleModels: RoleModel[]) => {
				return roleModels.map((roleModel: RoleModel) => {
					return this.roleAdapter.convertFromApi(roleModel);
				})
			}));
	}

	public addRole(role: Role): Observable<boolean> {
		return this.http.post<boolean>(`${environment.apiUrl}/roles`, this.roleAdapter.convertToApi(role));
	}

	public updateRole(role: Role): Observable<any> {
		return this.http.put<boolean>(`${environment.apiUrl}/roles/${role.id}`, this.roleAdapter.convertToApi(role));
	}

	public deleteRole(role: Role): Observable<any> {
		return this.http.delete<boolean>(`${environment.apiUrl}/roles/${role.id}`);
	}

	public checkRoleNameAvailability(groupId: number, name: string): Observable<boolean> {
		return this.http.head<boolean>(`${environment.apiUrl}/groups/${groupId}/roles/names/${name}`);
	}
}
