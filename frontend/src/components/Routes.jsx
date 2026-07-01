import AuthLayout from './AuthLayout.jsx';
import Register from './Register.jsx';
import LogIn from './Register.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import MainLayout from './MainLayout.jsx';
import Home from './Home.jsx';
// to be added: shared, favorites, folder/folderId...

import ErrorPage from './ErrorPage.jsx';

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
        ],
      },
    ],
  },
];
export default routes;
