import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

	@ViewChild("searchInput") input!: ElementRef;
	@Output() stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

	public value: string = "";

	@HostBinding('class.expanded') private isExpanded: boolean = false;
	@HostBinding('class.collapsed') private isCollapsed: boolean = false;

	constructor(private elementRef: ElementRef) {

	}

	ngOnInit(): void {
	}

	@HostListener('document:click', ['$event'])
	public onClick(event: Event) {
		const oldState: boolean = this.isExpanded;
		this.isExpanded = this.elementRef.nativeElement.contains(event.target)

		if (oldState == false && this.isExpanded == true)
			this.input.nativeElement.focus();

		else if (oldState == true && this.isExpanded == false)
			this.value = "";

		if (oldState != this.isExpanded) {
			this.isCollapsed = !this.isExpanded;
			this.stateChanged.emit(this.isExpanded);
		}
	}

	@HostListener('click')
	public onClickInside(event: Event) {
		const oldState: boolean = this.isExpanded;
		this.isExpanded = true;//this.elementRef.nativeElement.contains(event.target)
		this.isCollapsed = !this.isExpanded;

		if (oldState == false && this.isExpanded == true)
			this.input.nativeElement.focus();

		if (oldState != this.isExpanded) {
			this.isCollapsed = !this.isExpanded;
			this.stateChanged.emit(this.isExpanded);
		}
	}
}
