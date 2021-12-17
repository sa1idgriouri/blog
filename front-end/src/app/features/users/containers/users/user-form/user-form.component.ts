import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/common/user/services/user.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormType, FormWrapperComponent } from 'src/app/shared/modules/dynamic-form/components/form-wrapper/form-wrapper.component';
import { FormSchema } from 'src/app/shared/modules/dynamic-form/components/form/form.schema';
import { ValueChangedEventArgs } from 'src/app/shared/modules/dynamic-form/models/event-args';
import { FormConfig } from 'src/app/shared/modules/dynamic-form/models/form-config';
import { FormSchemaService } from 'src/app/shared/modules/dynamic-form/services/form-schema.service';
import { UserAdd } from '../../../models/user-add.model';
import { UserList, UserListItem } from '../../../models/user-list.model';
import { UserUpdate } from '../../../models/user-update';
import { USER_FORM_SCHEMA } from '../../../models/user.form.schema';
import { User } from '../../../models/user.model';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent extends FormWrapperComponent<User> {

  private subject: Subject<string>;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) data: any, private formSchemaService: FormSchemaService, private userService: UserService, private roleService: RoleService) {
    super(data, formSchemaService);
    let formConfig: FormConfig = {};
    let afterGenerate: (formSchema: FormSchema) => void;

    this.subject = new Subject();

    if (this.formType == FormType.Insert)
      formConfig.submit = "Ajouter";
    else if (this.formType == FormType.Update)
      formConfig.submit = "Modifier";

    afterGenerate = (formSchema: FormSchema) => {
      if (this.formType == FormType.Insert)
        formSchema.controls["submit"].theme = "success";

      else if (this.formType == FormType.Update)
        formSchema.controls["submit"].theme = "warning";

      else if (this.formType == FormType.Details)
        Object.values(formSchema.controls).forEach(formControlSchema => formControlSchema.enabled = false);


      if (this.formType == FormType.Update || this.formType == FormType.Details) {
        const updateUser = this.obj as UserUpdate



        formSchema.controls["firstName"].value = updateUser.name;
        formSchema.controls["lastName"].value = updateUser.username;
        //formSchema.controls["password"].value = updateUser.password;
        formSchema.controls["email"].value = updateUser.email;
      }

      this.roleService.getRoles().subscribe(roleList => {
        let options: { [key: string]: any } = {};
        for (let roleListItem of roleList.roles)
          options[roleListItem.name] = roleListItem.name;

        formSchema.controls["role"].options = options
      })

    }

    this.formSchema = this.formSchemaService.generate(USER_FORM_SCHEMA, formConfig, afterGenerate);
  }

  ngOnInit(): void {
  }

  public onSubmit(value: any) {
    if (this.formType == FormType.Insert) {
      const user: UserAdd = {
        name: value.firstName,
        username: value.lastName,
        email: value.email,
        password: value.password,
        role: value.role,
      }
      this.submit.emit(user);

    }

    if (this.formType == FormType.Update) {
      const userUpdate: UserUpdate = {
        id: 0,
        name: value.firstName,
        username: value.lastName,
        email: value.email,
        role: value.role,

      }

      let obj = this.obj as UserUpdate
      if (this.obj) {
        userUpdate.id = obj.id;
      }

      this.submit.emit(userUpdate);
    }
  }

}
