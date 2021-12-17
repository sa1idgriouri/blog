import { Injectable } from "@angular/core";
import { Adapter, ApiModel, Model } from "../../models/model";

export interface Role extends Model {
    id: number;
    name: string;

}

export interface RoleModel extends ApiModel {
    Id: number;
    Name: string;

}

@Injectable()
export class RoleAdapter extends Adapter<Role, RoleModel> {

    constructor() { super(); }

    toApi(model: Role): RoleModel {

        return {
            Id: model.id,
            Name: model.name,

        };
    }

    fromApi(apiModel: RoleModel): Role {

        return {
            id: apiModel.Id,
            name: apiModel.Name,

        }
    }

}