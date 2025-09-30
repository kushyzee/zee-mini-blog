import { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import { useFetchPosts } from "./hooks/customHooks";
import { Routes } from "./types/myTypes";

function App() {
  const [route, setRoute] = useState<Routes>("home");
  const [showNewPostButton, setShowNewPostButton] = useState(true);

  const updateRoute = (newRoute: Routes) => {
    setRoute(newRoute);
  };

  const toggleNewPostButton = (show: boolean) => {
    setShowNewPostButton(show);
  };

  const { posts, isLoading, setPosts } = useFetchPosts();

  return (
    <div className=" min-h-screen bg-gray-100">
      <Header
        setShowNewPostButton={setShowNewPostButton}
        showNewPostButton={showNewPostButton}
        updateRouteHandler={updateRoute}
      />
      <main>
        {route === "home" && (
          <Home
            isLoading={isLoading}
            posts={posts}
            updateRouteHandler={updateRoute}
          />
        )}
        {route === "new-post" && (
          <NewPost
            posts={posts}
            setPosts={setPosts}
            toggleNewPostButton={toggleNewPostButton}
            updateRouteHandler={updateRoute}
          />
        )}
        {/* Future routes can be added here */}
      </main>
    </div>
  );
}

export default App;
