import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";

import { Routes } from "@/types/myTypes";

interface BackButtonProps {
  updateRouteHandler: (newRoute: Routes) => void;
  toggleNewPostButton: (show: boolean) => void;
}

export default function BackButton({
  updateRouteHandler,
  toggleNewPostButton,
}: BackButtonProps) {
  const handleButtonPress = () => {
    updateRouteHandler("home");
    toggleNewPostButton(true);
  };

  return (
    <Button
      className="p-0 text-gray-600 md:text-lg"
      startContent={<ArrowLeft className="size-4 md:size-5" />}
      variant="light"
      onPress={handleButtonPress}
    >
      Back to Posts
    </Button>
  );
}
