import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorService } from '../../services/validator.service';


import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectComponent],
            providers: [ValidatorService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        // fixture = TestBed.createComponent(SelectComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        //expect(component).toBeTruthy();
    });
});
