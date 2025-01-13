import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { Toaster } from "react-hot-toast";
import ParticlesComp from "./components/ParticlesComp";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div id="app-container">
      
      <div id="particles-container">
        <ParticlesComp />
      </div>

      
      <Toaster />

     
      <div id="content-container">
        <RouterProvider router={router} />
      
      </div>
    </div>
    // <div>
    //   <ParticlesComp id="particles" />
    //   <Toaster />

    //   <RouterProvider router={router}></RouterProvider>
    //   <h1>hi</h1>
    // </div>
  );
}

export default App;
