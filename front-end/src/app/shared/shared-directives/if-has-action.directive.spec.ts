import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorService } from 'src/app/core/services/color.service';
import { IfHasActionDirective } from './if-has-action.directive';

@Component({
    template: `
        <h2 [ifHasAction]="1">Black on white</h2>
        <h2 [ifHasAction]="2">White on black</h2>
    `

})
class TestComponent { }

describe('IfHasActionDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let elements: DebugElement[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IfHasActionDirective, TestComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        elements = fixture.debugElement.queryAll(By.directive(IfHasActionDirective));
    });

    // it("should change font color based on background-color", () => {
    //     expect(elements[0].styles["color"] = "#000000dd");
    //     expect(elements[1].styles["color"] = "#ffffffdd");
    // });

});
