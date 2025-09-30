import { useState } from "react";
import { Card, CardBody, Form, Input, Textarea, Button } from "@heroui/react";
import { Save, X } from "lucide-react";

import BackButton from "./BackButton";

import { EditPostData, Post, Routes } from "@/types/myTypes";
import { updatePost } from "@/api/apiRequests";
import { validationHandler } from "@/utilities/functions";
import { useDocumentTitle } from "@/hooks/customHooks";

interface EditPostProps {
  updateRouteHandler: (newRoute: Routes) => void;
  posts: Post[];
  toggleNewPostButton: (show: boolean) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  editPostData: EditPostData;
}

export default function EditPost({
  toggleNewPostButton,
  updateRouteHandler,
  posts,
  setPosts,
  editPostData,
}: EditPostProps) {
  useDocumentTitle("Create New Post - Mini Blog");

  const { postId, postBody, postTitle } = editPostData;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form submit handler function
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !title.trim()) {
      return;
    }

    if (!content || !content.trim()) {
      return;
    }

    const postData = {
      title,
      body: content,
      date: Date.now(),
    };

    updatePost({
      postData,
      setPosts,
      posts,
      updateRouteHandler,
      toggleNewPostButton,
      setIsSubmitting,
      postId,
    });
  };

  return (
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <BackButton
        toggleNewPostButton={toggleNewPostButton}
        updateRouteHandler={updateRouteHandler}
      />
      <h1 className="text-3xl font-bold my-4 text-gray-800">Edit Post</h1>
      <p>Make changes to your post and update it for your readers.</p>
      <Card className="mt-8 p-4">
        <CardBody>
          <Form onSubmit={onSubmitHandler}>
            <div className="w-full flex flex-col gap-5 mb-4">
              <Input
                isClearable
                isRequired
                defaultValue={postTitle}
                label="Post Title"
                labelPlacement="outside-top"
                name="title"
                placeholder="Enter an engaging title..."
                validate={(value) => validationHandler(value, "Title", 5)}
                variant="bordered"
              />
              <Textarea
                isClearable
                isRequired
                defaultValue={postBody}
                label="Content"
                labelPlacement="outside-top"
                maxRows={18}
                minRows={18}
                name="content"
                placeholder="Share your thoughts, stories, and ideas..."
                validate={(value) => validationHandler(value, "Content", 10)}
                variant="bordered"
              ></Textarea>
            </div>
            <div className="space-x-3">
              <Button
                color="primary"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                startContent={!isSubmitting && <Save className="size-5" />}
                type="submit"
              >
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
              <Button
                startContent={<X className="size-5" />}
                variant="flat"
                onPress={() => {
                  updateRouteHandler("home");
                  toggleNewPostButton(true);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
