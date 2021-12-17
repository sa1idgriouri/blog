
import { Injectable } from "@angular/core";
import { Adapter, ApiModel, Model } from "../../../models/model";
import { Role, RoleAdapter, RoleModel } from "../../role/role.model";
import { UserCredential, UserCredentialAdapter, UserCredentialModel } from "./user-credential.model";

export interface User extends Model {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    credential?: UserCredential;
}

export interface UserModel extends ApiModel {
    Id: number;
    FirstName: string;
    LastName: string;
    Role: RoleModel;
    Credential?: UserCredentialModel;
}


@Injectable()
export class UserAdapter extends Adapter<User, UserModel> {
    constructor(private roleAdapter: RoleAdapter, private userCredentialAdapter: UserCredentialAdapter) { super(); }

    toApi(model: User): UserModel {
        return {
            Id: model.id,
            FirstName: model.firstName,
            LastName: model.lastName,
            Role: this.roleAdapter.toApi(model.role),
            Credential: model.credential ? this.userCredentialAdapter.toApi(model.credential) : undefined,
        }
    }

    fromApi(apiModel: UserModel): User {
        return {
            id: apiModel.Id,
            firstName: apiModel.FirstName,
            lastName: apiModel.LastName,
            role: this.roleAdapter.fromApi(apiModel.Role),
            credential: apiModel.Credential ? this.userCredentialAdapter.fromApi(apiModel.Credential) : undefined,
        }
    }
}