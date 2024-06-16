// App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotsLandingPage from './components/SpotsLandingPage';
import SpotDetailPage from './components/SpotDetailPage/SpotDetailPage';
import NewSpotForm from './components/NewSpotForm/NewSpotForm';



// Style
import { GiChessPawn } from "react-icons/gi";
import './App.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <h1>Save<GiChessPawn />Point</h1>
          <Outlet />
        </>
      )}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsLandingPage />,
      },
      {
        path: '/spots/new',
        element: <NewSpotForm />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
