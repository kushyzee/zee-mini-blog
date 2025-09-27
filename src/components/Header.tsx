import { BookOpen, Plus } from "lucide-react";
import { Button } from "@heroui/react";

export default function Header({
  updateRouteHandler,
}: {
  updateRouteHandler: (newRoute: string) => void;
}) {
  return (
    <header className="py-5 px-4 shadow-md fixed top-0 left-0 right-0 bg-transparent backdrop-blur-xl z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-bl from-blue-600 to-indigo-500 rounded-xl p-2">
            <BookOpen className="w-6 h-6 md:h-8 md:w-8 text-white mx-auto" />
          </div>
          <p className="text-xl font-bold text-gray-800 text-center">
            Mini Blog
          </p>
        </div>
        <Button
          className="font-medium"
          color="primary"
          radius="md"
          startContent={<Plus />}
          onPress={() => updateRouteHandler("new-post")}
        >
          New Post
        </Button>
      </div>
    </header>
  );
}
