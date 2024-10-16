import { createBrowserRouter } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import SearchPage from "../pages/SearchPage";
import App from "../App";
import Home from "../pages/Home";
import DetailsPage from "../pages/DetailsPage";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <ExplorePage/>
            },
            {
                path : ":explore/:id",
                element : <DetailsPage/>
            },
            {
                path : "search",
                element : <SearchPage/>
            }

    
            
        ]

        
    }
])

export default router