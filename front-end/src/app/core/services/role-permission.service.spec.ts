import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActionValue } from '../models/action-value.enum';
import { PermissionAdapter } from '../models/adapters/role-permission.adapter';
import { RoleAdapter } from '../models/adapters/role.adapter';
import { UserAdapter } from '../models/adapters/user.adapter';
import { PermissionType } from '../models/permission-type';
import { Role } from '../common/role/role.model';
import { Permission } from '../common/permission/permission.model';
import { AuthenticationService } from './authentication.service';
import { PermissionService } from './role-permission.service';

describe("PermissionService", () => {
    let service: PermissionService;
    let authenticationSpy: jasmine.SpyObj<AuthenticationService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                //{ provide: AuthenticationService, useValue: jasmine.createSpyObj("AuthenticationService", [], ["currentUserValue"]) },
                AuthenticationService,
                PermissionService,
                UserAdapter,
                RoleAdapter,
                PermissionAdapter
            ]
        });

        service = TestBed.inject(PermissionService);
        authenticationSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;

        const rolePermission: Permission[] = [
            { actionValue: 1, permission: PermissionType.Allowed },
            { actionValue: 2, permission: PermissionType.Allowed },
            { actionValue: 3, permission: PermissionType.Denied },
        ]

        const parentRole: Role = {
            id: 2, name: 'parent role', permissions: [
                { actionValue: 4, permission: PermissionType.Allowed },
                { actionValue: 5, permission: PermissionType.Denied },
            ]
        };

        spyOnProperty(authenticationSpy, "currentUserValue").and.callFake(() => {
            return {
                id: 1, firstName: 'test', lastName: 'test', roles: [{
                    id: 1, name: 'test', permissions: rolePermission, parent: parentRole
                }]
            };
        });
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("checkPermission should return true if current user role has permission of actions", () => {
        expect(service.checkPermission([1, 2])).toBeTrue();
        expect(service.checkPermission(4)).toBeTrue();
    })

    it("checkPermission should return false if current user role has not permission of actions", () => {
        expect(service.checkPermission([1, 2, 999])).toBeFalse();
        expect(service.checkPermission(999)).toBeFalse();
    })

    it("getPermissions should return correct rolepermissions", () => {
        const role = authenticationSpy.currentUserValue.roles[0];
        const actionValues = [1, 2, 3, 4, 5, 6];

        const expectedOutput: Permission[] = [
            { actionValue: 1, permission: PermissionType.Allowed, parentPermission: PermissionType.InheritedDenied },
            { actionValue: 2, permission: PermissionType.Allowed, parentPermission: PermissionType.InheritedDenied },
            { actionValue: 3, permission: PermissionType.Denied, parentPermission: PermissionType.InheritedDenied },
            { actionValue: 4, permission: PermissionType.InheritedAllowed, parentPermission: PermissionType.Allowed },
            { actionValue: 5, permission: PermissionType.InheritedDenied, parentPermission: PermissionType.Denied },
            { actionValue: 6, permission: PermissionType.InheritedDenied, parentPermission: PermissionType.InheritedDenied },
        ]
        const actualOutput = service.getPermissions(role, actionValues);

        expect(actualOutput).toEqual(expectedOutput);

    })

});
