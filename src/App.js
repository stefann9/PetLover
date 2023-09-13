import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PetDetailsPage from "./pages/detail";
import PetDetailsNotFound from "./pages/petDetailsNotFound";
import Root from "./components/root";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const appRouter = createBrowserRouter(
  createRoutesFromElements()
);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
