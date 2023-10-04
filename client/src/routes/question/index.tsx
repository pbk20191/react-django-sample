import { Outlet, RouteObject } from "react-router-dom";
import create from "./create";
import list from "./list";



const route: RouteObject = {
    path: "question",
    element: <Outlet/>,
    children: [
        list, create
    ]
}
export default route