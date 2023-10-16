import { useNavigate } from "react-router-dom";

const LogInButton = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="text-white hover:text-blue-600"
            onClick={() => navigate("/login")}
        >
            Log In
        </button>
    );
};

export default LogInButton;
