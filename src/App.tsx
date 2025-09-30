import { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import { useFetchPosts } from "./hooks/customHooks";
import { EditPostData, Routes } from "./types/myTypes";
import EditPost from "./components/EditPost";

function App() {
  const [route, setRoute] = useState<Routes>("home");
  const [showNewPostButton, setShowNewPostButton] = useState(true);

  const [editPostData, setEditPostData] = useState<EditPostData>({
    postBody: "",
    postTitle: "",
    postId: null,
  });

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
        showNewPostButton={showNewPostButton}
        toggleNewPostButton={toggleNewPostButton}
        updateRouteHandler={updateRoute}
      />
      <main>
        {route === "home" && (
          <Home
            isLoading={isLoading}
            posts={posts}
            setEditPostData={setEditPostData}
            setPosts={setPosts}
            toggleNewPostButton={toggleNewPostButton}
            updateRouteHandler={updateRoute}
          />
        )}
        {route === "new-post" && (
          <NewPost
            setPosts={setPosts}
            toggleNewPostButton={toggleNewPostButton}
            updateRouteHandler={updateRoute}
          />
        )}
        {route === "edit-post" && (
          <EditPost
            editPostData={editPostData}
            setPosts={setPosts}
            toggleNewPostButton={toggleNewPostButton}
            updateRouteHandler={updateRoute}
          />
        )}
      </main>
    </div>
  );
}

export default App;
