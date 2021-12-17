import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RoleList } from '../models/role-list.model';



@Injectable({
    providedIn: "root"
})
export class RoleService {

    constructor(private http: HttpClient,) { }




    public getRoles(): Observable<RoleList> {


        let roleList: RoleList = {
            roles: [
                {
                    id: 101,
                    name: "admin"
                },
                {
                    id: 220,
                    name: "chiefeditor"

                },

                {
                    id: 102,
                    name: "editor"
                },
                {
                    id: 210,
                    name: "user"

                },

            ]
        }

        return of(roleList)



    }
}