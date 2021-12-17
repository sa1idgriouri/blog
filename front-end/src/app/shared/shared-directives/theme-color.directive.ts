import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

export type ThemeColor = "primary" | "accent" | "warn" | "info" | "success" | "warning" | "danger" | undefined;


@Directive({
	selector: "[themeColor]"
})
export class ThemeColorDirective {

	@Input() set themeColor(value: ThemeColor) {
		this.renderer.addClass(this.element.nativeElement, `mat-${value}`);
	}

	constructor(private element: ElementRef, private renderer: Renderer2) { }

}
