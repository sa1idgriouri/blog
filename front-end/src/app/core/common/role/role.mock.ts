import { RoleModel } from "./role.model";

let roleIdentity: number = 0;
export function newRoleId(): number { return ++roleIdentity; }

export interface RoleDb {
	Id: number;
	Name: string;

}

const admin: RoleDb = {
	Id: newRoleId(),
	Name: "Administrateur",


}

const technician: RoleDb = {
	Id: newRoleId(),
	Name: "Administrateur",

}

export const roles: RoleDb[] = [admin, technician];

