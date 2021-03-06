import { User } from "./user";

export interface UserDetail{
    id?: number;
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    avatar?: string;
    user?: User;
}