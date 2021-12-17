import { Role } from "src/app/core/models/action";
import { UserRole } from "src/app/core/models/user-role.enum";

export interface UserSession {
    email: string;
    role: UserRole;
    token: string;
}

export interface UserSessionBackend {
    Email: string;
    Role: UserRole;
    Token: string;
}