import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogIn = async (e: any) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/user-page");
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <div className="mx-40 bg-gray-300 rounded-lg border-2 border-black text-center ">
            <form className="flex flex-col px-30">
                <h1 className="text-xl font-bold">Log In</h1>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 rounded-xl text-white"
                    onClick={handleLogIn}
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
