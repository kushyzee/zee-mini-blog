import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Trash2 } from "lucide-react";

import { deletePost } from "@/api/apiRequests";
import { Post } from "@/types/myTypes";

interface DeleteModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  postId: number | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({
  isOpen,
  onClose,
  postId,
  setPosts,
  setIsDeleting,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 mr-2">
                <Trash2 className="text-danger" />
              </div>
              <h3 className="text-lg font-bold">Delete Post</h3>
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this post? This action cannot be
                undone
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onPress={() =>
                  deletePost({ postId: postId, setPosts, setIsDeleting })
                }
              >
                Delete Post
              </Button>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
