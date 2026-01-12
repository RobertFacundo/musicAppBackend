import { IUser } from "../../shared/models/user.model";

export interface RegisterDTO {
    username: string
    email: string
    password: string
}

export interface LoginDTO {
    email: string
    password: string
}

export type PublicUser = Omit<IUser, 'passwordHash'>

export interface AuthResponse {
    user: PublicUser
    token: string
}