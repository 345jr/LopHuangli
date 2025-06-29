import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.tsx'
import Knowledge from './components/KnowledgePages/Knowledge.tsx'
import NotFoundPage from './components/Global/NotFoundPage.tsx'
import Updata from './components/UpPage/Updata.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/knowledge', element: <Knowledge />},
  {path: 'updata', element: <Updata />},
  {path: '*', element: <NotFoundPage />},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
