import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Calendar, Edit, Eye, Trash2 } from "lucide-react";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

import { EditPostData, Post, Routes } from "@/types/myTypes";
import {
  formatDate,
  getExcerpt,
  handleButtonPress,
} from "@/utilities/functions";

interface PostsProps {
  posts: Post[];
  setEditPostData: React.Dispatch<React.SetStateAction<EditPostData>>;
  isDeleting: boolean;
  onOpen: () => void;

  updateRouteHandler: (newRoute: Routes) => void;
  toggleNewPostButton: (show: boolean) => void;
}

export default function Posts({
  posts,
  setEditPostData,
  isDeleting,
  onOpen,
  updateRouteHandler,
  toggleNewPostButton,
}: PostsProps) {
  const handleEditButtonPress = (
    postTitle: string,
    postBody: string,
    postId: number
  ) => {
    setEditPostData({
      postTitle,
      postBody,
      postId,
    });

    handleButtonPress({
      updateRouteHandler,
      toggleNewPostButton,
      route: "edit-post",
    });
  };

  return (
    <section className="mt-8 flex flex-col gap-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <CardHeader>
            <div>
              <h2 className="text-xl text-gray-800 mb-2 font-semibold">
                {getExcerpt(post.title, "title", 40)}
              </h2>
              <div className="flex gap-1 items-center text-sm">
                <Calendar className="size-4" />
                <p>{post.date ? formatDate(post.date) : "Jan 15, 2024"}</p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <p>{getExcerpt(post.body, "body", 100)}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-between">
            <Button
              className="text-primary flex items-center gap-1.5 p-0"
              startContent={<Eye className="size-5" />}
              variant="light"
            >
              <p>Read More</p>
            </Button>
            <div className="flex gap-1">
              <Button
                className="bg-gray-100"
                startContent={<Edit className="size-5" />}
                variant="light"
                onPress={() =>
                  handleEditButtonPress(
                    getExcerpt(post.title, "title", 40),
                    post.body,
                    post.id
                  )
                }
              >
                Edit
              </Button>

              <Button
                isIconOnly
                className="text-danger"
                disabled={isDeleting}
                variant="light"
                onPress={() => {
                  onOpen();
                  setEditPostData({
                    postTitle: getExcerpt(post.title, "title", 40),
                    postBody: post.body,
                    postId: post.id,
                  });
                }}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
