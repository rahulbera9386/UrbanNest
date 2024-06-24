import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from './../pages/Home';
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const router=createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path:"sign-in",
                element:<Login/>
            }
        ]
       
    }
])


export default router;