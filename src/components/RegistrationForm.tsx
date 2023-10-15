import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { auth } from "../services/firebaseConfig";

const RegistrationFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("User signed up:", user);

            // Get a reference to the database
            const db = getDatabase();

            // Create a user object to store in the database
            const userForDatabase = {
                uid: user.uid,
                email: user.email,
                // ... any other user info you'd like to store
            };

            // Use the uid as the key for your user data in the database
            await set(ref(db, `users/${user.uid}`), userForDatabase);
        } catch (error: any) {
            console.error("Error:", error.code, error.message);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default RegistrationFrom;
