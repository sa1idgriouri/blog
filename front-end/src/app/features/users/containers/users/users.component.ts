import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';
import { DialogService } from 'src/app/shared/modules/dialog/services/dialog.service';
import { FormComponentData, FormType } from 'src/app/shared/modules/dynamic-form/components/form-wrapper/form-wrapper.component';
import { UserAdd } from '../../models/user-add.model';
import { UserList } from '../../models/user-list.model';
import { UserUpdate } from '../../models/user-update';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from './user-form/user-form.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {

  public userList?: UserList


  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private dialogService: DialogService, private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.laodUsers()
  }


  laodUsers() {
    this.subscriptions.push(this.userService.getUsers().subscribe(userList => this.userList = userList))
  }


  public onUpdateClick(userUpdate: UserUpdate) {

    let dialogRef = this.dialogService.open(UserFormComponent, { data: { obj: userUpdate, formType: FormType.Update } as FormComponentData }, false, "Modifier le user", "warning");

    this.subscriptions.push(dialogRef.componentInstance.submit.subscribe((userUpdate: UserUpdate) => {
      console.log("userUpdate", userUpdate.id)
      this.subscriptions.push(this.userService.updateUser(userUpdate).subscribe(_ => {
        dialogRef.close();
        this.laodUsers();
        this.alertService.success("User modifié avec succès", undefined);
      }))
    }))
  }

  public onDeleteClick(UserId: any) {
    this.subscriptions.push(this.alertService.confirm(`Confirmer la suppression du User `, undefined).subscribe((result: boolean) => {
      if (result == true)
        this.subscriptions.push(this.userService.deleteUser(UserId).subscribe(_ => {
          this.laodUsers()
          this.alertService.success(` User  supprimé avec succès`, undefined);
        }))
    }))
  }

  public onAddClick() {
    let dialogRef = this.dialogService.open(UserFormComponent, { data: { formType: FormType.Insert } as FormComponentData }, false, "Ajoute le user", "success");

    this.subscriptions.push(dialogRef.componentInstance.submit.subscribe((user: UserAdd) => {
      this.subscriptions.push(this.userService.addUser(user).subscribe(_ => {
        dialogRef.close();
        this.laodUsers();
        this.alertService.success("User ajoute avec succès", undefined);
      }, ((error: any) => console.log(error))))
    }))
  }



  public onDetailsClick(user: User) {
    let dialogRef = this.dialogService.open(UserFormComponent, { data: { obj: user, formType: FormType.Details } as FormComponentData }, false, "Détails du User", "info");
  }

}
