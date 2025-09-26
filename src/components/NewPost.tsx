import { Card, CardBody, Form } from "@heroui/react";

export default function NewPost() {
  return (
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Create New Post</h1>
      <p>Share your thoughts, ideas, and stories with the community.</p>
      <Card>
        <CardBody>
          <Form></Form>
        </CardBody>
      </Card>
    </div>
  );
}
