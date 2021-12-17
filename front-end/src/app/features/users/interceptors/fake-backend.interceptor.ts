import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { BaseFakeBackendInterceptor } from 'src/app/core/models/base-fake-backend-interceptor';

// import * as mock from "./mock"

@Injectable()
export class FakeBackendInterceptor extends BaseFakeBackendInterceptor implements HttpInterceptor {

  constructor() {
    super();

    this.methodMocks = [
      // { url: "user", method: "GET", mock: this.getUsers },
      // { url: "user", method: "POST", mock: this.addUser },
      // { url: "user/:userId", method: "PUT", mock: this.userUpdate }

    ]
  }

  // private getUsers(request: HttpRequest<any>) {
  //   return super.ok(mock.Users);
  // }

  // private addUser(request: HttpRequest<any>) {
  //   let user: UserModel = request.body;
  //   user.Id = mock.newUserId();
  //   mock.Users.push(user);

  //   return super.ok(user);
  // }


  // private userUpdate(request: HttpRequest<any>) {
  //   let user: UserModel = request.body;
  //   let userId = Number.parseInt(request.params.get("userId") || "-1");

  //   let userToUpdate = mock.Users.find(user => user.Id == userId);

  //   if (userToUpdate == undefined)
  //     return super.error(400, "user  not found");

  //   userToUpdate.Name = user.Name;
  //   userToUpdate.Password = user.Password;
  //   userToUpdate.Email = user.Email

  //   return super.ok();
  // }



}
