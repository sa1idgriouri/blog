import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOnlyLayoutComponent } from './footer-only-layout.component';

describe('FooterOnlyLayoutComponent', () => {
	let component: FooterOnlyLayoutComponent;
	let fixture: ComponentFixture<FooterOnlyLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterOnlyLayoutComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterOnlyLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
