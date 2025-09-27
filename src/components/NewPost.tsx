import { Button, Card, CardBody, Form, Input } from "@heroui/react";

import BackButton from "./BackButton";

interface NewPostProps {
  updateRouteHandler: (newRoute: string) => void;
}

export default function NewPost({ updateRouteHandler }: NewPostProps) {
  // Form submit handler
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    console.log(formData.append);
  };

  return (
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <BackButton updateRouteHandler={updateRouteHandler} />
      <h1 className="text-4xl font-bold my-4 text-gray-800">Create New Post</h1>
      <p>Share your thoughts, ideas, and stories with the community.</p>
      <Card className="mt-8 p-4">
        <CardBody>
          <Form onSubmit={onSubmitHandler}>
            <div className="w-full flex flex-col gap-4">
              <Input
                isRequired
                errorMessage="Please enter a proper title"
                label="Post Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter an engaging title..."
              />
            </div>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
