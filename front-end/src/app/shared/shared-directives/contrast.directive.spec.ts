import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorService } from 'src/app/core/services/color.service';
import { ContrastDirective } from './contrast.directive';

@Component({
    template: `
        <h2 [contrast] [style.background-color]="'#ffffff'">Black on white</h2>
        <h2 [contrast] [style.background-color]="'#000000'">White on black</h2>
    `

})
class TestComponent { }

describe('ContrastDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let elements: DebugElement[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContrastDirective, TestComponent],
            providers: [ColorService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        elements = fixture.debugElement.queryAll(By.directive(ContrastDirective));
    });

    it("should change font color based on background-color", () => {
        expect(elements[0].styles["color"] = "#000000dd");
        expect(elements[1].styles["color"] = "#ffffffdd");
    });

});
