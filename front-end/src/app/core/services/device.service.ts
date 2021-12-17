import { ApplicationRef, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Trace } from '../decorators/trace.decorator';
import { Browser } from '../models/browser.enum';
import { DeviceType } from '../models/device-type.enum';
import { ScreenSize } from '../models/screen-size.enum';
import { Logger } from '../singletons/logger';

@Injectable()
export class DeviceService implements OnDestroy {

	private fullScreenChangedSubscription$: Subscription;
	private resizeSubscription$: Subscription;

	private _screenSize: ScreenSize;

	public get screenSize(): ScreenSize {
		return this._screenSize;
	}

	private _isFullScreen: boolean = false;

	public get isFullScreen(): boolean {
		return this._isFullScreen;
	}

	private _deviceType: DeviceType;

	public get deviceType(): DeviceType {
		return this._deviceType;
	}

	private _browser: Browser;

	public get browser(): Browser {
		return this._browser;
	}

	constructor(private deviceDetectorService: DeviceDetectorService, private applicationRef: ApplicationRef) {
		this._screenSize = ScreenSize.lg;
		this.updateScreenSizeValue(window.innerWidth);

		this.resizeSubscription$ = fromEvent(window, 'resize').subscribe((evt: any) => {
			this.updateScreenSizeValue(window.innerWidth as number)
		})

		this.fullScreenChangedSubscription$ = fromEvent(window, 'fullscreenchange').subscribe((evt: any) => {
			this._isFullScreen = !this._isFullScreen;
		})

		if (this.deviceDetectorService.isDesktop())
			this._deviceType = DeviceType.Desktop;
		else if (this.deviceDetectorService.isTablet())
			this._deviceType = DeviceType.Tablet;
		else if (this.deviceDetectorService.isMobile())
			this._deviceType = DeviceType.Mobile;
		else
			this._deviceType = DeviceType.Unknown;

		switch (this.deviceDetectorService.browser) {
			case "Chrome": this._browser = Browser.Chrome; break;
			case "Firebox": this._browser = Browser.Firefox; break;
			case "Opera": this._browser = Browser.Opera; break;
			case "Safari": this._browser = Browser.Safari; break;
			case "Edge": this._browser = Browser.Edge; break;
			default: this._browser = Browser.Unknown;
		}

	}

	ngOnDestroy(): void {
		this.resizeSubscription$.unsubscribe();
		this.fullScreenChangedSubscription$.unsubscribe();
	}

	public toggleFullScreen() {
		if (this._isFullScreen) {

			if (document.exitFullscreen)
				document.exitFullscreen();

			else if ((document as any).msExitFullscreen)
				(document as any).msExitFullscreen();

			else if ((document as any).mozCancelFullScreen)
				(document as any).mozCancelFullScreen();

			else if ((document as any).webkitExitFullscreen)
				(document as any).webkitExitFullscreen();

		} else {

			if (document.documentElement.requestFullscreen)
				document.documentElement.requestFullscreen();

			else if ((document.documentElement as any).webkitRequestFullscreen)
				(document.documentElement as any).webkitRequestFullscreen();

			else if ((document.documentElement as any).mozRequestFullScreen)
				(document.documentElement as any).mozRequestFullScreen();

			else if ((document.documentElement as any).msRequestFullscreen)
				(document.documentElement as any).msRequestFullscreen();
		}

	}

	private updateScreenSizeValue(width: number): void {

		if (width < 600)
			this._screenSize = ScreenSize.xs;
		else if (width >= 600 && width < 960)
			this._screenSize = ScreenSize.sm;
		else if (width >= 960 && width < 1280)
			this._screenSize = ScreenSize.md;
		else if (width >= 1280 && width < 1920)
			this._screenSize = ScreenSize.lg;
		else
			this._screenSize = ScreenSize.xl;

	}

}
