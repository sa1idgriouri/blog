import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserList, UserListItem } from '../../../models/user-list.model';
import { UserUpdate } from '../../../models/user-update';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'username', 'email', "role", "actionDetails", "actionUpdate", "actionDelete"];
  public dataSource?: MatTableDataSource<UserListItem>;


  isAdmin = true
  @Output() add: EventEmitter<User> = new EventEmitter();
  @Output() details: EventEmitter<User> = new EventEmitter();
  @Output() update: EventEmitter<User> = new EventEmitter();
  @Output() delete: EventEmitter<User> = new EventEmitter();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input() set userList(value: UserList | undefined) {
    this.dataSource = new MatTableDataSource<UserListItem>(value?.users);

    if (this.paginator != undefined)
      this.dataSource.paginator = this.paginator;
  }
  constructor(private auth: AuthenticationService) {
    if (this.auth.currentUserValue.role == "admin") {
      this.isAdmin = false
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.dataSource != undefined && this.paginator != undefined)
      this.dataSource.paginator = this.paginator;
  }

}
