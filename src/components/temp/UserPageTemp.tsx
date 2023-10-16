import { get, getDatabase, ref } from "firebase/database";
import { useState } from "react";
import { auth } from "../../services/firebase";

const UserPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const handleUserDataRetrieve = async () => {
        const db = getDatabase();
        const usersRef = ref(db, "users");

        const snapshot = await get(usersRef);
        const userData = snapshot.val();
        const usersArray = Array.isArray(userData)
            ? userData
            : Object.values(userData);
        setUsers(usersArray);
    };

    const handleLogOut = async () => {
        try {
            await auth.signOut();
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className="flex flex-col mx-40">
            <button
                className="px-4 py-2 bg-blue-500 border border-blue-700 rounded-lg"
                onClick={handleUserDataRetrieve}
            >
                Get User Data
            </button>
            {users.length && (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.email}</li>
                    ))}
                </ul>
            )}
            <button
                className="px-4 py-2 bg-blue-500 border border-blue-700 rounded-lg"
                onClick={handleLogOut}
            >
                Log Out
            </button>
        </div>
    );
};

export default UserPage;
