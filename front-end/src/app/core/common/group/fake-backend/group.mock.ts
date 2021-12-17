import { GroupModel } from "../models/group.model";

let groupIdentity: number = 0;
export function newGroupId(): number { return ++groupIdentity }

const group1: GroupModel = {
	Id: newGroupId(),
	Name: "Groupe 1",
	Acronym: "GR1",
}

const group2: GroupModel = {
	Id: newGroupId(),
	Name: "Groupe 2",
	Acronym: "GR2",
}

export const groups: GroupModel[] = [group1, group2];