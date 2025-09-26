import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="text-gray-600 min-h-screen bg-gray-100">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
