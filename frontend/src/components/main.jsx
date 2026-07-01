// react & packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router"

// styles
import '../style/main.css';
import '../style/_variables.css';
import '../style/_reset.css';

// files
import routes from "./Routes.jsx"

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
