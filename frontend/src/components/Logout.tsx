import { FC } from "react";
import { Navigate } from "react-router-dom";

const Logout: FC = (): JSX.Element => {
    localStorage.removeItem('purple-token');

    return <Navigate to="/" />;
}

export default Logout;