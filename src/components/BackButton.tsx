import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  updateRouteHandler: (newRoute: string) => void;
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
