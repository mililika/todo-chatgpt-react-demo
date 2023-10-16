import { useNavigate } from "react-router-dom";

const LogInButton = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="text-blue-700 hover:text-blue-600"
            onClick={() => navigate("/login")}
        >
            Log In
        </button>
    );
};

export default LogInButton;
