import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionValue } from '../models/action-value.enum';

import { SidebarItem } from '../models/sidebar-item';
import { AuthenticationService } from './authentication.service';
import { NavigationService } from './navigation.service';
import { PermissionService } from './role-permission.service';


describe("NavigationService", () => {
    let service: NavigationService;
    let rolePermissionSpy: jasmine.SpyObj<PermissionService>;
    let router: Router;

    const initialSidebarItems: SidebarItem[] = [
        { icon: 'icon 1', text: 'text 1', conditions: 2, url: "/url1" },
        { icon: 'icon 2', text: 'text 2', conditions: 2, url: "/url2" },
        {
            icon: 'icon 3', text: 'text 3', sidebarItems: [
                { icon: 'icon 3 1', text: 'text 3 1', conditions: 2, url: "/url31" },
                { icon: 'icon 3 2', text: 'text 3 2', url: "/url32" },
                { icon: 'icon 3 3', text: 'text 3 3', conditions: 1, url: "/url33" }
            ]
        },
        {
            icon: 'icon 4', text: 'text 4', sidebarItems: [
                { icon: 'icon 4 1', text: 'text 4 1', conditions: 2, url: "/url41" },
            ]
        },
        { icon: 'icon 5', text: 'text 5', url: "/url5" },
        { icon: 'icon 6', text: 'text 6', conditions: [1, 3], url: "/" },
    ];

    const permittedSidebarItems: SidebarItem[] = [
        {
            icon: 'icon 3', text: 'text 3', sidebarItems: [
                { icon: 'icon 3 2', text: 'text 3 2', url: "/url32" },
                { icon: 'icon 3 3', text: 'text 3 3', conditions: 1, url: "/url33" }
            ]
        },

        { icon: 'icon 5', text: 'text 5', url: "/url5" },
        { icon: 'icon 6', text: 'text 6', conditions: [1, 3], url: "/" },
    ];

    const fakeCheckPermission = (actionValue: ActionValue | ActionValue[] | undefined): boolean => {
        const permittedActions = [1, 3]

        if (actionValue == undefined)
            return true;

        if (!Array.isArray(actionValue))
            return permittedActions.indexOf(actionValue) >= 0;
        else
            for (let av of actionValue)
                if (permittedActions.indexOf(av) < 0)
                    return false;

        return true;
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [
                { provide: PermissionService, useValue: jasmine.createSpyObj(PermissionService, ['checkPermission']) },
                AuthenticationService,
                NavigationService
            ]
        });

        service = TestBed.inject(NavigationService);
        rolePermissionSpy = TestBed.inject(PermissionService) as jasmine.SpyObj<PermissionService>;
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("isRelatedToUrl should return true if sidebarItem.url equals url", () => {
        const sidebar: SidebarItem = { text: "text", icon: "icon", "url": "unit_test_url" };
        const url: string = "unit_test_url";

        const isRelatedTo: boolean = service.isRelatedToUrl(sidebar, url);

        expect(isRelatedTo).toBeTrue();
    });

    it("isRelatedToUrl should return false if sidebarItem.url does not equal url", () => {
        const sidebar: SidebarItem = { text: "text", icon: "icon", "url": "wrong_unit_test_url" };
        const url: string = "unit_test_url";

        const isRelatedTo: boolean = service.isRelatedToUrl(sidebar, url);

        expect(isRelatedTo).toBeFalse();
    });

    it("isRelatedToUrl should return false if sidebarItem.url is undefined", () => {
        const sidebar: SidebarItem = { text: "text", icon: "icon" };
        const url: string = "unit_test_url";

        const isRelatedTo: boolean = service.isRelatedToUrl(sidebar, url);

        expect(isRelatedTo).toBeFalse();
    });

    it("isRelatedToUrl should return true if sidebarItem parent has child where its url equals url", () => {
        const sidebar: SidebarItem = { text: "parent", icon: "icon", sidebarItems: [{ text: "text", icon: "icon", "url": "unit_test_url" }] };
        const url: string = "unit_test_url";

        const isRelatedTo: boolean = service.isRelatedToUrl(sidebar, url);

        expect(isRelatedTo).toBeTrue();
    });

    it("isRelatedToUrl should return false if sidebarItem parent has no child where its url equal url", () => {
        const sidebar: SidebarItem = { text: "parent", icon: "icon", sidebarItems: [] };
        const url: string = "unit_test_url";

        const isRelatedTo: boolean = service.isRelatedToUrl(sidebar, url);

        expect(isRelatedTo).toBeFalse();
    });

    it("navigateTo url should navigate to the url", () => {
        const url: string = "/dashboard";
        let spy = spyOn<any>(router, "navigateByUrl").and.stub();

        service.navigateTo(url);

        expect(spy).toHaveBeenCalledOnceWith(url);
        //expect(router.url).toEqual(url);
    });

    it("should emit event on navigation changed", (done: DoneFn) => {
        const url: string = "/";
        const mock: SidebarItem[] = [{ icon: 'dashboard', text: 'Tableau de bord', conditions: ActionValue.Dashboard, url: url }];
        let spy = spyOn<any>(service, "getAllSidebarItems").and.returnValues(initialSidebarItems);

        service.navigationChanged.subscribe(sidebarItem => {
            expect(sidebarItem).toEqual(initialSidebarItems[5] as any);
            done();
        });

        router.navigateByUrl(url);
    });

    it("getUserSidebarItems should only return permitted sidebars", () => {
        rolePermissionSpy.checkPermission.and.callFake(fakeCheckPermission);
        spyOn<any>(service, "getAllSidebarItems").and.returnValues(initialSidebarItems);

        const actualOutput = service.getUserSidebarItems();

        expect(actualOutput).toEqual(permittedSidebarItems);
    });

    it("getDefaultPage should return the first permitted sidebarItem", () => {
        rolePermissionSpy.checkPermission.and.callFake(fakeCheckPermission);
        spyOn<any>(service, "getAllSidebarItems").and.returnValues(initialSidebarItems);

        const expectedOutput = "/url32";

        const actualOutput = service.getDefaultPage();
        expect(actualOutput).toEqual(expectedOutput);
    })

});
