/* eslint-disable prettier/prettier */


import { RoleUser } from "./role.enum";

export interface User {
    id: number,
    name: string;
    username: string;
    email?: string,
    password?: string
    role?: RoleUser

}