export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type Routes = "home" | "new-post" | "edit-post";

export interface EditPostData {
  postId: number | null;
  postTitle: string;
  postBody: string;
}
