import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActionEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/core/models/schedule/schedule';
import { ScheduleEvent } from 'src/app/core/models/schedule/schedule-event';
import { TimeInterval } from 'src/app/core/models/schedule/time-interval';
import { WorkTime } from 'src/app/core/models/schedule/work-time';

@Directive({
	selector: 'ejs-schedule[schedule]'
})
export class ScheduleDirective implements OnInit, AfterViewInit, OnDestroy {
	@Input("schedule") schedule?: Schedule
	@Input("scheduleEvents") scheduleEvents?: ScheduleEvent[];
	@Output("navigationChange") navigationChange: EventEmitter<[Date, Date]> = new EventEmitter<[Date, Date]>();

	private subscriptions: Subscription[] = [];

	constructor(private scheduleComponent: ScheduleComponent, private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit(): void {
		if (this.schedule == undefined)
			return;

		if (this.scheduleComponent && this.scheduleComponent.actionComplete && this.scheduleComponent.actionComplete.subscribe)
			this.subscriptions.push(this.scheduleComponent.actionComplete.subscribe((args: ActionEventArgs) => this.onScheduleActionComplete(args)));
	}

	ngAfterViewInit(): void {
		this.scheduleComponent.firstDayOfWeek = 1;

		setTimeout(() => {
			if (this.schedule != undefined)
				this.loadWorkTime(this.schedule?.workTime)
		}, 2000);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private onScheduleActionComplete(args: ActionEventArgs) {
		if (args.requestType == "viewNavigate" || args.requestType == "dateNavigate") {

		}
	}

	private loadWorkTime(workTime: WorkTime) {
		if (workTime != undefined && this.scheduleComponent.currentView == "Week" || this.scheduleComponent.currentView == "WorkWeek" || this.scheduleComponent.currentView == "Day") {
			let minStartTime: string = "23:59";
			let maxEndTime: string = "00:00";

			let workHours: Array<[Date, string, string]> = [];

			this.scheduleComponent.getCurrentViewDates().forEach(date => {
				if (workTime == undefined)
					return;

				const workTimeParts = workTime.workTimeParts.filter(workTimePart => {
					if (workTimePart.startDate <= date && date <= workTimePart.endDate) {
						console.log(`${workTimePart.startDate.toDateString()} <= ${date.toDateString()} <= ${workTimePart.endDate.toDateString()}`);
						return true;
					}
					return false;
				});

				if (workTimeParts.length > 0) {
					//console.log(workTimeParts.length);

					const workTimePart = workTimeParts[0];

					const dayOfWeek = date.getDay();
					let workHour: TimeInterval[] | undefined;

					workTime.exceptions.forEach(exceptionalDate => {
						if (exceptionalDate[0].toDateString() == date.toDateString())
							workHour = exceptionalDate[1];
					})

					if (workHour == undefined)
						switch (dayOfWeek) {
							case 1: workHour = workTimePart.weekWorkHours.monday; break;
							case 2: workHour = workTimePart.weekWorkHours.tuesday; break;
							case 3: workHour = workTimePart.weekWorkHours.wednesday; break;
							case 4: workHour = workTimePart.weekWorkHours.thursday; break;
							case 5: workHour = workTimePart.weekWorkHours.friday; break;
							case 6: workHour = workTimePart.weekWorkHours.saturday; break;
							case 0: workHour = workTimePart.weekWorkHours.sunday; break;
						}

					if (workHour != undefined)
						workHour.forEach(timeInterval => {
							//this.scheduleComponent.setWorkHours([date], timeInterval.startTime, timeInterval.endTime);
							workHours.push([date, timeInterval.startTime, timeInterval.endTime])

							if (timeInterval.startTime < minStartTime)
								minStartTime = timeInterval.startTime;
							if (timeInterval.endTime > maxEndTime)
								maxEndTime = timeInterval.endTime;

						});

				}
				// else
				// console.log(`${date.toDateString()} has no workt time part`);
			});

			//console.log(`[${minStartTime}] => [${maxEndTime}]`);

			this.scheduleComponent.startHour = minStartTime;
			this.scheduleComponent.endHour = maxEndTime;

			setTimeout(() => {
				this.scheduleComponent.resetWorkHours();
				workHours.forEach(tuple => {
					this.scheduleComponent.setWorkHours([tuple[0]], tuple[1], tuple[2]);
				})
			});


		}
	}

	private loadEvents(scheduleEvents: ScheduleEvent[]) {

	}

}
