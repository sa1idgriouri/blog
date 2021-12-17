

export interface UserListItem {
    id: string,
    name: string,
    username: string,
    email: string,
    role: string
}

export interface UserList {
    users: Array<UserListItem>
}

export interface UserListBackend {
    items: Array<{
        Id: string,
        Name: string,
        Username: string,
        Email: string,
        Role: string
    }>

}