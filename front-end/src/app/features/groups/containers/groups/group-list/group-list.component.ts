import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/core/common/group/models/group.model';

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.sass']
})
export class GroupListComponent implements AfterViewInit {
	@Output() details: EventEmitter<Group> = new EventEmitter();
	@Output() update: EventEmitter<Group> = new EventEmitter();
	@Output() delete: EventEmitter<Group> = new EventEmitter();

	@ViewChild(MatPaginator) paginator?: MatPaginator;
	public columns: string[] = ["id", "name", "acronym", "userCount", "actionDetails", "actionUpdate", "actionDelete"]
	public dataSource?: MatTableDataSource<Group>;

	@Input() set groups(value: Group[] | undefined) {
		this.dataSource = new MatTableDataSource<Group>(value);

		if (this.paginator != undefined)
			this.dataSource.paginator = this.paginator;
	}

	constructor() { }

	ngAfterViewInit(): void {
		if (this.dataSource != undefined && this.paginator != undefined)
			this.dataSource.paginator = this.paginator;
	}

	ngOnInit(): void {
	}

}
