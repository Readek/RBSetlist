import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/global.css"
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root'
import ErrorPage from './error-page'
import { SetlistProvider } from './contexts/setlistContext'
import "./i18n";

const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SetlistProvider>
      <RouterProvider router={router}/>
    </SetlistProvider>
  </StrictMode>,
)
