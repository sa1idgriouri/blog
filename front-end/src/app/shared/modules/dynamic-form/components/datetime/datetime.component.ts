import { MatDatetimePickerInputEvent } from "@angular-material-components/datetime-picker";
import { AfterViewInit, Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatMenu } from "@angular/material/menu";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UtilityService } from "src/app/core/services/utility.service";
import { Logger } from "src/app/core/singletons/logger";
import { FormControlComponent } from "../../models/form-control-component";
import { ValidatorService } from "../../services/validator.service";

export const MY_FORMATS = {
	parse: {
		dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
	},
	display: {
		// dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
		dateInput: 'input',
		monthYearLabel: { year: 'numeric', month: 'short' },
		dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
		monthYearA11yLabel: { year: 'numeric', month: 'long' },
	}
};

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {
	format(date: Date, displayFormat: Object): string {
		if (displayFormat == "input") {
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			let dateStr = this._to2digit(day) + '/' + this._to2digit(month) + '/' + year + " " + this._to2digit(date.getHours()) + ":" + this._to2digit(date.getMinutes());
			return dateStr;
		}
		else {
			return date.toDateString();
		}
	}

	private _to2digit(n: number) {
		return ('00' + n).slice(-2);
	}
}

@Component({
	selector: "df-datetime",
	templateUrl: "./datetime.component.html",
	styleUrls: ["./datetime.component.sass"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MyDateAdapter,
			//deps: [MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS]
		},
		//{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	]
})
export class DateTimeComponent extends FormControlComponent implements OnInit, AfterViewInit, OnDestroy {
	public times: string[] = [];
	public showTimes: boolean = false;

	public currentTime?: string;

	@ViewChild("datepicker") datepicker?: MatDatepicker<any>;
	private subscriptions: Subscription[] = [];

	constructor(public validatorService: ValidatorService, private utilityService: UtilityService, private elementRef: ElementRef) {
		super();
		this.subscriptions.push(this.utilityService.documentMouseDown.subscribe(event => this.onMouseDown(event)));
		this.loadTimes();
	}

	ngOnInit(): void {

		let date = this.formControl.value as Date;

		if (date != undefined)
			this.currentTime = ('00' + date.getHours()).slice(-2) + ":" + ('00' + date.getMinutes()).slice(-2)

	}

	ngAfterViewInit(): void {
		// if (this.datepicker != undefined)
		// 	this.subscriptions.push(this.datepicker.);

		//this.subscriptions.push(this.formControl.valueChanges.subscribe(value => console.log("value changes", value)));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	public onDateChanged(event: MatDatetimePickerInputEvent<any>) {
		this.onTimeSelected(this.currentTime || "00:00");
	}

	private loadTimes() {
		this.times = [];

		for (let hour = 0; hour < 24; hour++) {
			this.times.push(this.utilityService.zeroPad(hour, 2) + ":00");
			this.times.push(this.utilityService.zeroPad(hour, 2) + ":30");
		}
	}

	private onMouseDown($event: any) {
		if (!($event.path as Array<HTMLElement>).some(element => element == this.elementRef.nativeElement))
			this.showTimes = false;
	}

	public onTimeSelected(time: string) {
		let currentDate: Date;
		if (this.formControl?.value == undefined)
			currentDate = new Date();
		else
			currentDate = new Date(this.formControl?.value)

		const timeSplit = time.split(":");
		const hours = parseInt(timeSplit[0]);
		const minutes = parseInt(timeSplit[1]);

		currentDate.setHours(hours);
		currentDate.setMinutes(minutes);
		//console.log(`replace ${this.formControl?.value} with ${currentDate}`);

		this.showTimes = false;
		this.currentTime = time;

		this.formControl?.patchValue(currentDate);

	}
}
function MatDatePicker(MatDatePicker: any) {
	throw new Error("Function not implemented.");
}

