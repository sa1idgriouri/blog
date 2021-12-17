import { Injectable } from "@angular/core";
import { Adapter, ApiModel, Model } from "../../../models/model";

export interface Group extends Model {
	id: number;
	name: string;
	acronym: string;
}

export interface GroupModel extends ApiModel {
	Id: number;
	Name: string;
	Acronym: string;
}

@Injectable()
export class GroupAdapter extends Adapter<Group, GroupModel> {

	constructor() { super(); }

	toApi(model: Group): GroupModel {
		return {
			Id: model.id,
			Name: model.name,
			Acronym: model.acronym,
			//Associations: model.associations.map(associations => [])
		}
	}

	fromApi(apiModel: GroupModel): Group {
		return {
			id: apiModel.Id,
			name: apiModel.Name,
			acronym: apiModel.Acronym,
		}
	}

}