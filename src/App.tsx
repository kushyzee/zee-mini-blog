import { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";

function App() {
  const [route, setRoute] = useState("home");

  const updateRoute = (newRoute: string) => {
    setRoute(newRoute);
  };

  return (
    <div className="text-gray-600 min-h-screen bg-gray-100">
      <Header updateRouteHandler={updateRoute} />
      <main>
        {route === "home" && <Home />}
        {route === "new-post" && <NewPost />}
        {/* Future routes can be added here */}
      </main>
    </div>
  );
}

export default App;
