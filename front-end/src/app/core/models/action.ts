import { ModuleType } from "./module";

export class Role {

    private static roles: Role[] = [];

    public static Admin = new Role(101, "Admin");
    public static DisplayDashboard = new Role(200, "Afficher le tableau de bord");



    constructor(value: number, name: string,) {
        if (Role.roles.some(role => role.value == value))
            throw new Error(`Action with value = ${value} already exists`);
        else
            Role.roles.push(this);

        this.value = value;
        this.name = name;
    }

    public static getAll(): Role[] {
        return [...this.roles];
    }

    readonly value: number;
    readonly name: string;
}