import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { auth } from "../services/firebase";

const INPUT_STYLE = "my-2 px-4 py-2";

const RegistrationFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            const db = getDatabase();
            const userForDatabase = {
                uid: user.uid,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
            };

            await set(ref(db, `users/${user.uid}`), userForDatabase);
        } catch (error: any) {
            console.error("Error:", error.code, error.message);
        }
    };

    return (
        <div className="mx-40 bg-gray-300 rounded-lg border-2 border-black text-center ">
            <form onSubmit={handleSignUp} className="flex flex-col px-30">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={INPUT_STYLE}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={INPUT_STYLE}
                    required
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className={INPUT_STYLE}
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className={INPUT_STYLE}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegistrationFrom;
