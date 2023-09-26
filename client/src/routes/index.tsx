import { Outlet, createBrowserRouter, redirect } from "react-router-dom"
import landing from "./landing"
import apple from "./apple"


const router = createBrowserRouter([
    {
        index: true,
        loader: () => {
            return redirect("/app")
        }
    },
   {
    path: "app",
    element: <Outlet/>,
    children: [landing, apple]
   }
], { basename: "/react"})

export default router