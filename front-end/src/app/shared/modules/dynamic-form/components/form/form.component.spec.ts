import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from '../../helpers/dynamic-field.directive';
import { ValidatorService } from '../../services/validator.service';


import { FormComponent } from './form.component';
import { FormSchema } from './form.schema';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    let formSchema: FormSchema = {
        type: "registration",
        controls: [
            { type: "button", name: "button1", label: "button 1" }
        ],
        grid: [
            [1]
        ]
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [FormComponent, DynamicFieldDirective],
            providers: [ValidatorService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        component.schema = formSchema;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
