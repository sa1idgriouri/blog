import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from 'src/environments/environment';
import { UserAdd, UserAddBackend } from '../models/user-add.model';
import { UserList, UserListBackend } from '../models/user-list.model';
import { UserUpdate, UserUpdateBackend } from '../models/user-update';


@Injectable({
  providedIn: "root"
})
export class UserService {
  public platformBehaviorSubject: BehaviorSubject<UserList>;

  private token = this.auth.currentUserValue.token
  private header = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.platformBehaviorSubject = new BehaviorSubject(undefined as any as UserList);
  }






  public getUsers(): Observable<UserList> {



    this.http.get<UserListBackend>(`${environment.apiURL}/users/`, { headers: this.header }).pipe(
      map((userListBackend: UserListBackend) => {

        let userList: UserList = {
          users: []
        };

        for (let user of userListBackend.items)
          userList.users.push({
            id: user.Id,
            name: user.Name,
            email: user.Email,
            username: user.Username,
            role: user.Role
          })

        console.log(userList)

        return userList;
      }
      )).pipe(first()).subscribe(platform => {
        this.platformBehaviorSubject?.next(platform);
      })

    return this.platformBehaviorSubject.asObservable();
  }

  public addUser(userAdd: UserAdd): Observable<any> {
    const userAddBackend: UserAddBackend = {
      Name: userAdd.name,
      Username: userAdd.username,
      Email: userAdd.email,
      Password: userAdd.password,
      Role: userAdd.role,
    }

    return this.http.post<boolean>(`${environment.apiURL}/users`, userAddBackend, { headers: this.header })
  }


  public deleteUser(UserId: number): Observable<any> {
    return this.http.delete<boolean>(`${environment.apiURL}/users/${UserId}`, { headers: this.header });
  }

  public updateUser(userUpdate: UserUpdate): Observable<any> {
    const userUpdateBackend: UserUpdateBackend = {
      Id: userUpdate.id,
      Name: userUpdate.name,
      Username: userUpdate.username,
      Email: userUpdate.email,
      Role: userUpdate.role,
    }



    return this.http.put<boolean>(`${environment.apiURL}/users/${userUpdate.id}`, userUpdateBackend, { headers: this.header });
  }













}
