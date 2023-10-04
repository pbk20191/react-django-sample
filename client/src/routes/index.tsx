import { Outlet, createBrowserRouter, redirect } from "react-router-dom"
import landing from "./landing"
import question from "./question"


const router = createBrowserRouter([
    {
        index: true,
        loader: () => {
            return redirect("./app", 301)
        }
    },
   {
    path: "app",
    element: <Outlet/>,
    children: [landing, question]
   }
], { basename: "/react"})

export default router