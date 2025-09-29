import { useEffect, useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import { Post } from "./types/myTypes";

function App() {
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  const [route, setRoute] = useState("home");
  const [showNewPostButton, setShowNewPostButton] = useState(true);

  const updateRoute = (newRoute: string) => {
    setRoute(newRoute);
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Change document title
  useEffect(() => {
    document.title = "Home - Mini Blog";
  }, []);

  // fetch post from API
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}?_limit=6`);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className=" min-h-screen bg-gray-100">
      <Header
        setShowNewPostButton={setShowNewPostButton}
        showNewPostButton={showNewPostButton}
        updateRouteHandler={updateRoute}
      />
      <main>
        {route === "home" && <Home isLoading={isLoading} posts={posts} />}
        {route === "new-post" && (
          <NewPost
            posts={posts}
            setPosts={setPosts}
            updateRouteHandler={updateRoute}
          />
        )}
        {/* Future routes can be added here */}
      </main>
    </div>
  );
}

export default App;
