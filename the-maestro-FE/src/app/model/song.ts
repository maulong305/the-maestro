import { User } from "./user";

export interface Song{
    id?: number;
    name?: string;
    file?: string;
    createdAt?: any;
    numberOfView?: number;
    singer?: string;
    author?: string;
    avatar?: string;
    lyric?: string;
    user?: User;
}