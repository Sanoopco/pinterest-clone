import { Post } from "./post"

export interface Savedpost {
  id: string
  user: string
  post: Post
  created_date: string
}
