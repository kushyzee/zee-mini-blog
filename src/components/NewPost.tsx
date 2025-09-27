import { Button, Card, CardBody, Form, Input, Textarea } from "@heroui/react";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

import BackButton from "./BackButton";

interface NewPostProps {
  updateRouteHandler: (newRoute: string) => void;
}

interface Post {
  title: string;
  content: string;
}

export default function NewPost({ updateRouteHandler }: NewPostProps) {
  const [post, setPost] = useState<Post | {}>({});

  // Form submit handler
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !title.trim()) {
      return;
    }

    if (!content || !content.trim()) {
      return;
    }

    setPost({
      title,
      content,
    });
  };

  console.log("post Submitted:", post);

  const validationHandler = (
    value: string,
    type: "Title" | "Content",
    length: number
  ) => {
    if (!value.trim()) {
      return `${type} is required`;
    }
    if (value.trim().length < length) {
      return `${type} must be at least ${length} characters long`;
    }

    return null;
  };

  useEffect(() => {
    const sendPost = () => {};
  }, [post]);

  return (
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <BackButton updateRouteHandler={updateRouteHandler} />
      <h1 className="text-3xl font-bold my-4 text-gray-800">Create New Post</h1>
      <p>Share your thoughts, ideas, and stories with the community.</p>
      <Card className="mt-8 p-4">
        <CardBody>
          <Form onSubmit={onSubmitHandler}>
            <div className="w-full flex flex-col gap-5 mb-4">
              <Input
                isClearable
                isRequired
                label="Post Title"
                labelPlacement="outside-top"
                minLength={5}
                name="title"
                placeholder="Enter an engaging title..."
                validate={(value) => validationHandler(value, "Title", 5)}
                variant="bordered"
              />
              <Textarea
                isClearable
                isRequired
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
                startContent={<Save className="size-5" />}
                type="submit"
              >
                Publish Post
              </Button>
              <Button startContent={<X className="size-5" />} variant="flat">
                Cancel
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
