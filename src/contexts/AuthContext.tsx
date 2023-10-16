import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { auth } from "../services/firebase";

const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuthState = async () => {
            await auth.authStateReady();
            setCurrentUser(auth.currentUser);

            const unsubscribe = auth.onAuthStateChanged((user) => {
                setCurrentUser(user);
            });

            setLoading(false);

            return unsubscribe;
        };

        initializeAuthState();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
