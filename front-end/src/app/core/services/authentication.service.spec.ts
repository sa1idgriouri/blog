import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { User } from '../common/user/models/user.model';
import { UserAdapter } from '../models/adapters/user.adapter';
import { RoleAdapter } from '../models/adapters/role.adapter';
import { PermissionAdapter } from '../models/adapters/role-permission.adapter';
import { UserModel } from '../models/api/user.api';

describe("AuthenticationService", () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let userAdapterSpy: jasmine.SpyObj<UserAdapter>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthenticationService,
                { provide: UserAdapter, useValue: jasmine.createSpyObj(UserAdapter, ["fromApi"]) }
                , RoleAdapter, PermissionAdapter]
        });

        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
        userAdapterSpy = TestBed.inject(UserAdapter) as jasmine.SpyObj<UserAdapter>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("should emit user on successfully login", (done: DoneFn) => {
        let subscriptionsCount: number = 0;
        const expectedOutput: User = { id: 1, firstName: "test", lastName: "test", roles: [] };
        userAdapterSpy.fromApi.and.returnValue(expectedOutput);

        service.login("correct_user", "correct_password").subscribe(user => {
            expect(user).toEqual(expectedOutput);
            if (++subscriptionsCount >= 2)
                done();
        });

        service.currentUser$.subscribe(user => {
            expect(user).toEqual(expectedOutput);
            if (++subscriptionsCount >= 2)
                done();
        });

        const req = httpMock.expectOne("user/authenticate");
        expect(req.request.method).toBe("POST");
        req.flush({ Id: 1, FirstName: "test", LastName: "test", Roles: [] } as UserModel);
    })

    it("should emit error on unsuccessfull login", () => {

    });

    //it("")

});
