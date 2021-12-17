import { Role } from "./action";
import { UserRole } from "./user-role.enum";

export interface SidebarItem {
	text: string;
	icon: string;
	allowOnly?: UserRole | UserRole[];
	url?: string;
	fragment?: string;
	sidebarItems?: SidebarItem[]
}