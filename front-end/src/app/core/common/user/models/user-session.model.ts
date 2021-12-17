
import { Injectable } from "@angular/core";
import { Adapter, ApiModel, Model } from "../../../models/model";
import { Role, RoleAdapter, RoleModel } from "../../role/role.model";
import { UserCredential, UserCredentialAdapter, UserCredentialModel } from "./user-credential.model";

export interface UserSession extends Model {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: { id: number, name: string };
    token: string;
}

export interface UserSessionModel extends ApiModel {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string
    Role: { Id: number, Name: string };
    Token: string
}


@Injectable({ providedIn: "root" })
export class UserSessionAdapter extends Adapter<UserSession, UserSessionModel> {
    constructor() { super(); }

    toApi(model: UserSession): UserSessionModel {
        return {
            Id: model.id,
            FirstName: model.firstName,
            LastName: model.lastName,
            Email: model.email,
            Role: {
                Id: model.role.id,
                Name: model.role.name,

            },
            Token: model.token
        }
    }

    fromApi(apiModel: UserSessionModel): UserSession {
        return {
            id: apiModel.Id,
            firstName: apiModel.FirstName,
            lastName: apiModel.LastName,
            email: apiModel.Email,
            role: {
                id: apiModel.Role.Id,
                name: apiModel.Role.Name,
            },
            token: apiModel.Token
        }
    }
}