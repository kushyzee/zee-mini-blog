import { Post, Routes } from "@/types/myTypes";

interface PostData {
  title: string;
  body: string;
  userId?: number;
  date: number;
}

interface UpdatePostParams extends SendPostParams {
  postId: number | null;
}

interface SendPostParams {
  postData: PostData;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  updateRouteHandler: (newRoute: Routes) => void;
  toggleNewPostButton: (show: boolean) => void;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeletePostParams {
  postId: number;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

// Function to send post to API
export const sendPost = async ({
  postData,
  setPosts,
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

      setPosts((prevPost) => [data, ...prevPost]);

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

export const updatePost = async ({
  postData,
  setPosts,
  updateRouteHandler,
  toggleNewPostButton,
  setIsSubmitting,
  postId,
}: UpdatePostParams) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (response.ok) {
      const data = await response.json();

      setPosts((prevPosts) => {
        const newPosts = prevPosts.filter((post) => post.id !== postId);

        return [data, ...newPosts];
      });

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

export const deletePost = async ({ postId, setPosts }: DeletePostParams) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      console.log("Post deleted successfully");
    } else {
      console.log("Failed to delete the post");
    }
  } catch (error) {
    console.log(error);
  }
};
