import { get, getDatabase, ref } from "firebase/database";
import { useState } from "react";

const UserPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const handleUserDataRetrieve = async () => {
        const db = getDatabase();
        const usersRef = ref(db, "users");
        console.log("User Ref");
        console.log(usersRef);

        const snapshot = await get(usersRef);
        console.log("Snapshot of user ref");
        console.log(snapshot);

        const userData = snapshot.val();
        console.log("Snapshot.val()");
        console.log(userData);

        const usersArray = Array.isArray(userData)
            ? userData
            : Object.values(userData);
        setUsers(usersArray);
    };

    return (
        <>
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
        </>
    );
};

export default UserPage;
