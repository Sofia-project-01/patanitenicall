import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutApp from './components/layout/index.tsx'
import HomePageProduce from './components/homepage/index.tsx'
import Produce from './components/produce/Produce.tsx'
import Warehouse from './components/warehouse/index.tsx'
import EditPageTable from './components/editpage/index.tsx'
import AddProduce from './components/Report repairs/Report_repairs.tsx'


const router = createBrowserRouter ([
  {
   path: "/" ,
   element: <LayoutApp/>,
   children:[
    {
      path: "/" ,
      element: <HomePageProduce/>
    },
    {
      path: "/Produce/:id",
      element:<Produce/>
     },
     {
      path:"/Warehouse",
      element:<Warehouse />
     },
     {
      path:"/coffee/:id",
      element:<EditPageTable />
     },
     {
      path:"/Report_repairs",
      element:<AddProduce />
     }
   ]
  },
 ])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
