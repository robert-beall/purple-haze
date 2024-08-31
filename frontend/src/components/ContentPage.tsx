import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { isLoggedIn } from "../utils/AuthUtils";
import NavMap from "./NavMap";

const ContentPage: FC = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isRoot, setIsRoot] = useState(false);

    useEffect(() => {
        setIsRoot(location.pathname === '/');
    }, [isRoot]); 
    
    if (!isLoggedIn()) {
       return (<Navigate to="/login" />);
    }

    return (
        <>
            <Helmet>
                <title>Purple Haze</title>
            </Helmet>
            <div className="flex">
                <div className="h-screen sticky top-0">
                    <NavMap />
                </div>
                <div className="h-screen justify-center items-center w-full text-center mt-32 mx-12">
                    { isRoot ? <HomePage /> : <Outlet />}
                </div> 
            </div>      
        </> 
    );
}

export default ContentPage;