import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group, GroupAdapter, GroupModel } from '../models/group.model';

@Injectable()
export class GroupService {

	constructor(private http: HttpClient, private groupAdapter: GroupAdapter) {
	}

	public getGroups(): Observable<Group[]> {
		return this.http.get<GroupModel[]>(`${environment.apiUrl}/groups`).pipe(map((groupModels: GroupModel[]) =>
			groupModels.map((groupModel: GroupModel) => this.groupAdapter.convertFromApi(groupModel))
		))
	}

	public addGroup(group: Group): Observable<any> {
		return this.http.post<boolean>(`${environment.apiUrl}/groups`, this.groupAdapter.convertToApi(group));
	}

	public updateGroup(group: Group): Observable<any> {
		return this.http.put<boolean>(`${environment.apiUrl}/groups/${group.id}`, this.groupAdapter.convertToApi(group));
	}

	public deleteGroup(group: Group): Observable<any> {
		return this.http.delete<boolean>(`${environment.apiUrl}/groups/${group.id}`);
	}

	public checkGroupNameAvailability(name: string): Observable<boolean> {
		return this.http.head<boolean>(`${environment.apiUrl}/groups/names/${name}`);
	}

}
