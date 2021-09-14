export interface AppUser {
    id: string;
}

export type UserState = { isLoggedIn: boolean; user?: AppUser };
