import { Post } from "./post";
import { User } from "./user";

export interface Comment {
  id: string;
  user: User;
  post: Post;
  comment: string;
  created_date: string;
}
