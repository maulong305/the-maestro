import { Song } from "./song";
import { User } from "./user";

export interface Playlist{
    id?: number;
    name?: string;
    createdAt?: any;
    avatar?: string;
    numberOfView?: number;
    user?: User;
    songs?: Song[];
}