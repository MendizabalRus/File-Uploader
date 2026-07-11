import AuthLayout from './layouts/AuthLayout.jsx';
import Register from './pages/Register.jsx';
import LogIn from './pages/LogIn.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import FolderPage from './pages/Folderpage.jsx';
// to be added: shared, favorites, folder/folderId...

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
            element: <Home />,
          },
          {
            path: "folders/:folderId",
            element: <FolderPage />
          }
        ],
      },
    ],
  },
];
export default routes;
