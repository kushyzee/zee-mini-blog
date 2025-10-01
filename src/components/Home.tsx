import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Spinner, useDisclosure } from "@heroui/react";
import { Calendar, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

import DeleteModal from "./DeleteModal";

import { useDocumentTitle } from "@/hooks/customHooks";
import {
  formatDate,
  getExcerpt,
  handleButtonPress,
} from "@/utilities/functions";
import { EditPostData, Routes } from "@/types/myTypes";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  date?: number;
}

interface HomeProps {
  isLoading: boolean;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  updateRouteHandler: (newRoute: Routes) => void;
  toggleNewPostButton: (show: boolean) => void;
  editPostData: EditPostData;
  setEditPostData: React.Dispatch<React.SetStateAction<EditPostData>>;
}

export default function Home({
  isLoading,
  posts,
  setPosts,
  updateRouteHandler,
  toggleNewPostButton,
  editPostData,
  setEditPostData,
}: HomeProps) {
  useDocumentTitle("Home - Mini Blog");

  const [isDeleting, setIsDeleting] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return (
      <div className="pt-32 max-w-4xl mx-auto p-4 flex items-center justify-center">
        <Spinner label="loading..." size="lg" />
      </div>
    );
  }

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
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <DeleteModal
        isOpen={isOpen}
        postId={editPostData.postId}
        setIsDeleting={setIsDeleting}
        setPosts={setPosts}
        onClose={onClose}
        onOpen={onOpen}
      />
      {/* Hero section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Mini Blog
        </h1>
        <p className="text-xl">
          Discover amazing stories, insights, and ideas from our community of
          writers.
        </p>
      </div>

      {/* Posts section */}
      <section className="mt-8 flex flex-col gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="text-gray-600 p-4">
            <CardHeader>
              <div>
                <h1 className="text-xl text-gray-800 mb-2 font-semibold">
                  {getExcerpt(post.title, "title", 40)}
                </h1>
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
                    handleEditButtonPress(post.title, post.body, post.id)
                  }
                >
                  Edit
                </Button>

                <Button
                  isIconOnly
                  className="text-danger"
                  disabled={isDeleting}
                  isLoading={isDeleting}
                  variant="light"
                  onPress={() => {
                    onOpen();
                    setEditPostData({
                      postTitle: post.title,
                      postBody: post.body,
                      postId: post.id,
                    });
                  }}
                >
                  {!isDeleting && <Trash2 className="size-5" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
