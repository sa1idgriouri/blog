import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorService } from '../../services/validator.service';


import { DateComponent } from './date.component';

describe('DateComponent', () => {
    let component: DateComponent;
    let fixture: ComponentFixture<DateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DateComponent],
            providers: [ValidatorService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // fixture = TestBed.createComponent(DateComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
