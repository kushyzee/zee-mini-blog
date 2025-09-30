import { Post } from "@/types/myTypes";

interface PostData {
  title: string;
  body: string;
  userId: number;
  date: number;
}

interface SendPostParams {
  postData: PostData;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
  updateRouteHandler: (newRoute: string) => void;
  toggleNewPostButton: (show: boolean) => void;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

// Function to send post to API
export const sendPost = async ({
  postData,
  setPosts,
  posts,
  updateRouteHandler,
  toggleNewPostButton,
  setIsSubmitting,
}: SendPostParams) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const data = await response.json();

      setPosts([data, ...posts]);

      updateRouteHandler("home");
      toggleNewPostButton(true);
    } else {
      console.log("response not ok");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsSubmitting(false);
  }
};
