import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/global.css"
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root'
import ErrorPage from './error-page'
import { SetlistProvider } from './contexts/setlistContext'
import "./i18n";
import SetlistView from './pages/setlistView'
import Login from './pages/login'
import { AuthProvider } from './contexts/authContext'
import User from './pages/user'

const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setlist",
    element: <SetlistView />,
  },
  {
    path: "/Config/Login",
    element: <Login />,
  },
  {
    path: "/Config/User",
    element: <User />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SetlistProvider>
        <RouterProvider router={router}/>
      </SetlistProvider>
    </AuthProvider>
  </StrictMode>,
)
