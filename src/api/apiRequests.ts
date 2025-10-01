import { Post, Routes } from "@/types/myTypes";
import { showToast } from "@/utilities/functions";

interface PostData {
  title: string;
  body: string;
  userId?: number;
  date: number;
  id?: number | undefined;
}

interface UpdatePostParams extends SendPostParams {
  postId: number | undefined;
}

interface SendPostParams {
  postData: PostData;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  updateRouteHandler: (newRoute: Routes) => void;
  toggleNewPostButton: (show: boolean) => void;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeletePostParams {
  postId: number | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
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
      showToast(
        "Post Created",
        "Your post has been created successfully.",
        "success"
      );

      const data = await response.json();

      setPosts((prevPost) => [data, ...prevPost]);

      updateRouteHandler("home");
      toggleNewPostButton(true);
    } else {
      console.log("response not ok");
    }
  } catch (error) {
    console.log(error);

    showToast(
      "Error",
      "There was an error creating your post. Please try again.",
      "danger"
    );
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
  postData.id = postId;
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
      showToast(
        "Post Updated",
        "Your post has been updated successfully.",
        "success"
      );

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
    showToast(
      "Error",
      "There was an error updating your post. Please try again.",
      "danger"
    );
  } finally {
    setIsSubmitting(false);
  }
};

export const deletePost = async ({
  postId,
  setPosts,
  setIsDeleting,
}: DeletePostParams) => {
  setIsDeleting(true);

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      showToast(
        "Post Deleted",
        "Your post has been deleted successfully.",
        "success"
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } else {
      console.log("Failed to delete the post");
    }
  } catch (error) {
    console.log(error);
    showToast(
      "Error",
      "There was an error deleting your post. Please try again.",
      "danger"
    );
  } finally {
    setIsDeleting(false);
  }
};
