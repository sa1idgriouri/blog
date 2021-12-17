import { TestBed } from '@angular/core/testing';
import { ScreenSize } from '../models/screen-size.enum';
import { DeviceService } from './device.service';

describe("DeviceService", () => {
    let service: DeviceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DeviceService]
        });
        service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("should call updateScreenSizeValue methood on window resize", () => {

        const spy = spyOn<any>(service, 'updateScreenSizeValue');

        window.dispatchEvent(new Event('resize'));

        expect(spy).toHaveBeenCalled()
    });

    it("should update screenSize value on window resize", () => {

        const data: Array<[number, ScreenSize]> = [
            [Math.random() * 600, ScreenSize.xs],
            [Math.random() * 360 + 600, ScreenSize.sm],
            [Math.random() * 320 + 960, ScreenSize.md],
            [Math.random() * 640 + 1280, ScreenSize.lg],
            [Math.random() * 1000 + 1920, ScreenSize.xl],
        ];

        data.forEach(row => {
            (window as any).innerWidth = row[0];
            window.dispatchEvent(new Event('resize'));
            expect(service.screenSize).toEqual(row[1]);
        })
    });

    it("should toggle fullScreen", () => {
        const oldValue: boolean = service.isFullScreen;

        service.toggleFullScreen();
        // since toggleFullScreen requires user gesture, we dispatch the event
        window.dispatchEvent(new Event('fullscreenchange'));

        expect(oldValue).not.toEqual(service.isFullScreen);
    });
});
