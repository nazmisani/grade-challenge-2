import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../src/views/LandingPage";
import DetailProduct from "../src/views/readDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/detail/:id",
    element: <DetailProduct />,
  },
]);

export default router;
