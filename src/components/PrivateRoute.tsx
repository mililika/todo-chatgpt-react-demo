import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type PrivateRouteProps = {
    element: React.ReactElement;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
    const currentUser = useAuth();

    return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
