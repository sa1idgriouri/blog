import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AlertService {

	constructor() { }

	public success(title: string | undefined, message: string | undefined) {
		Swal.fire(title, message, "success");
	}

	public error(title: string | undefined, message: string | undefined) {
		Swal.fire(title, message, "error");
	}

	public confirm(title: string | undefined, message: string | undefined): Observable<boolean> {
		let subject: Subject<boolean> = new Subject();

		Swal.fire({
			title: title,
			text: message,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#12b312',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirmer'
		}).then((result) => {
			subject.next(result.isConfirmed);
		})

		return subject.asObservable();
	}
}
