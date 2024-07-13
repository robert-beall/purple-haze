import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavMap from "./NavMap";
import { isLoggedIn } from "../utils/AuthUtils";

const ContentPage: FC = (): JSX.Element => {
    if (!isLoggedIn()) {
       return (<Navigate to="/login" />);
    }

    return (
        <div className="flex">
            <div className="h-screen sticky top-0"><NavMap /></div>
            <div className="w-full px-28 py-20">
                <Outlet />
            </div> 
        </div>  
    );
}

export default ContentPage;