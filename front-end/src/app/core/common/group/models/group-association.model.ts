import { Injectable } from "@angular/core"
import { Action } from "src/app/core/models/action"
import { Adapter, ApiModel, Model } from "../../../models/model"
import { Group, GroupAdapter, GroupModel } from "./group.model"

export interface GroupAssociation extends Model {
	id: number;
	group1: Group;
	group2: Group;

	group1Actions: Action[];
	group2Actions: Action[];
}

export interface GroupAssociationModel extends ApiModel {
	Id: number;
	Group1: GroupModel;
	Group2: GroupModel;

	Group1Actions: number[];
	Group2Actions: number[];
}

@Injectable()
export class GroupAssociationAdapter extends Adapter<GroupAssociation, GroupAssociationModel> {

	constructor(private groupAdapter: GroupAdapter) { super(); }

	toApi(model: GroupAssociation): GroupAssociationModel {
		return {
			Id: model.id,
			Group1: this.groupAdapter.toApi(model.group1),
			Group2: this.groupAdapter.toApi(model.group2),
			Group1Actions: model.group1Actions.map(action => action.value),
			Group2Actions: model.group2Actions.map(action => action.value),
		}
	}

	fromApi(apiModel: GroupAssociationModel): GroupAssociation {
		let actions: Action[] = Action.getAll();
		return {
			id: apiModel.Id,
			group1: this.groupAdapter.fromApi(apiModel.Group1),
			group2: this.groupAdapter.fromApi(apiModel.Group2),
			group1Actions: apiModel.Group1Actions.map(actionValue => actions.filter(action => action.value == actionValue)[0]),
			group2Actions: apiModel.Group2Actions.map(actionValue => actions.filter(action => action.value == actionValue)[0])
		}
	}

}