import { Directive, ElementRef, OnInit } from '@angular/core';
import { ColorService } from 'src/app/core/services/color.service';

@Directive({
	selector: '[contrast]'
})
export class ContrastDirective implements OnInit {

	constructor(private elementRef: ElementRef, private colorService: ColorService) { }

	ngOnInit(): void {
		const backgroundColor: string = this.elementRef.nativeElement.style.backgroundColor;
		const contrast = this.colorService.contrastOf(backgroundColor);
		this.elementRef.nativeElement.style.color = contrast;

		//console.log(`contrast of ${backgroundColor} => ${contrast}`);
	}

}
