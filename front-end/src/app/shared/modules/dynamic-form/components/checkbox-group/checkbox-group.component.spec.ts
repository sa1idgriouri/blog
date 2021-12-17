import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorService } from '../../services/validator.service';


import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxGroupComponent', () => {
    let component: CheckboxGroupComponent;
    let fixture: ComponentFixture<CheckboxGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckboxGroupComponent],
            providers: [ValidatorService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // fixture = TestBed.createComponent(CheckboxGroupComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
