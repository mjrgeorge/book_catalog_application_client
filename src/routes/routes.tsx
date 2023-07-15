import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import AllBook from '@/pages/AllBook';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';
import RecentBook from '@/pages/RecentBook';

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
        path: '/book/:bookId',
        element: <BookDetails />,
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
