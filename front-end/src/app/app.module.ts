import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from './shared/layout/layout.module';


@NgModule({
	declarations: [
		AppComponent,

	],
	imports: [
		AppRoutingModule,
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		LayoutModule,
	],

	providers: [
		//{ provide: LOCALE_ID, useValue: 'fr-FR' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },


	],

	bootstrap: [AppComponent]
})
export class AppModule {
}
