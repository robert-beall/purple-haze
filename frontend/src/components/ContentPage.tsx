import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavMap from "./NavMap";

const ContentPage: FC = (): JSX.Element => {
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