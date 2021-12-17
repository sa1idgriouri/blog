import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorService } from '../../services/validator.service';


import { RadiobuttonComponent } from './radiobutton.component';

describe('RadiobuttonComponent', () => {
    let component: RadiobuttonComponent;
    let fixture: ComponentFixture<RadiobuttonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RadiobuttonComponent],
            providers: [ValidatorService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // fixture = TestBed.createComponent(RadiobuttonComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
