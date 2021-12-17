import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';

import { FormComponent } from '../form/form.component';
import { FormSchema } from '../form/form.schema';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    let formSchema: FormSchema = {
        type: "registration",
        controls: [{ type: "button", name: "test" }],
        grid: [[1]]
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [ButtonComponent, FormComponent],
            providers: [ValidatorService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // let formFixture = TestBed.createComponent(FormComponent);
        // let formComponent = formFixture.componentInstance;
        // formComponent.schema = formSchema;
        // formFixture.detectChanges();

        //fixture = TestBed.createComponent(ButtonComponent);
        //component = formComponent.

        //component.schema = formSchema.controls[0];
        //component.formComponent = formComponent;

        //fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
