import { User } from "./user.model";


export interface UserAdd extends User {
    name: string,
    username: string,
    email: string,
    password: string,
    role: string,


}

export interface UserAddBackend {
    Name: string,
    Username: string,
    Email: string,
    Password: string,
    Role: string,


}

