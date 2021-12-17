export interface RoleListItem {
    id: number,
    name: string
}


export interface RoleList {
    roles: Array<RoleListItem>
}

export interface RoleListBackend {
    Id: number,
    Name: string
}