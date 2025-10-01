export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;

  date?: number;
}

export type Routes = "home" | "new-post" | "edit-post";

export interface EditPostData {
  postId: number | undefined;
  postTitle: string;
  postBody: string;
}
