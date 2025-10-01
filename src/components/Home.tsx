import { Card, CardBody, CardHeader } from "@heroui/card";
import { Spinner, useDisclosure } from "@heroui/react";
import { useState } from "react";

import DeleteModal from "./DeleteModal";
import Posts from "./Posts";

import { useDocumentTitle } from "@/hooks/customHooks";
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

  return (
    <div className="pt-32 max-w-4xl mx-auto p-4">
      <DeleteModal
        isDeleting={isDeleting}
        isOpen={isOpen}
        postId={editPostData.postId}
        postTitle={editPostData.postTitle}
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
      {posts.length === 0 ? (
        <Card className="mt-16 text-center p-4">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800 text-center">
              No posts available
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-lg">
              Add a new post by clicking the &quot;New Post&quot; button above.
            </p>
          </CardBody>
        </Card>
      ) : (
        <Posts
          isDeleting={isDeleting}
          posts={posts}
          setEditPostData={setEditPostData}
          toggleNewPostButton={toggleNewPostButton}
          updateRouteHandler={updateRouteHandler}
          onOpen={onOpen}
        />
      )}
    </div>
  );
}
