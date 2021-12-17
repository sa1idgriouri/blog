import { RoleDb, roles } from "../../role/role.mock";
import { Role, RoleModel } from "../../role/role.model";
//import { UserModel } from "../models/user.model";

let userIdentity: number = 0;
export function newUserId(): number { return ++userIdentity; }

interface UserDb {
	Id: number;
	FirstName: string;
	LastName: string;
	Role: RoleDb;
	Email: string,
	Username: string;
	Password: string;
	Token?: string;
}

const admin: UserDb = {
	Id: newUserId(),
	FirstName: "Admin",
	LastName: "Admin",
	Email: "admin@gmail.com",
	Role: roles[0],
	Username: "admin",
	Password: "admin",
}

const technicien: UserDb = {
	Id: newUserId(),
	FirstName: "Technicien",
	LastName: "Technicien",
	Email: "example@gmail.com",
	Role: roles[1],
	Username: "technicien",
	Password: "technicien"
}



export const users: UserDb[] = [admin, technicien];