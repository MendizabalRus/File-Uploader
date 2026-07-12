// Authentication related routes
import AuthLayout from './layouts/AuthLayout.jsx';
import Register from './pages/Register.jsx';
import LogIn from './pages/LogIn.jsx';

// 
import ProtectedRoute from './ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Explorer from "./pages/Explorer.jsx";
// import Favorites from "./pages/Favorites.jsx";
// import Shared from "./pages/Shared.jsx";


import ErrorPage from './pages/ErrorPage.jsx';

const routes = [
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/log-in',
        element: <LogIn />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Explorer />,
          },
          {
            path: "folders/:folderId",
            element: <Explorer />
          }
        ],
      },
    ],
  },
];
export default routes;
