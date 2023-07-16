import App from '@/App';
import AllBook from '@/pages/AllBook';
import BookDetails from '@/pages/BookDetails';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import RecentBook from '@/pages/RecentBook';
import Signup from '@/pages/Signup';
import PrivateRoute from '@/routes/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AllBook />,
      },
      {
        path: '/book/:id',
        element: (
          <PrivateRoute>
            <BookDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: '/recent_book',
        element: <RecentBook />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
