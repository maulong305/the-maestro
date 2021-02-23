import { Song } from "./song";
import { User } from "./user";

export interface CommentSong{
    id?: number;
    content?: string;
    user?: User;
    song?: Song;
    creationTime?: string
  }
  