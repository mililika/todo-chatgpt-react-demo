import { get, getDatabase, ref } from "firebase/database";
import { useState } from "react";

interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
}

const AllUsersList = () => {
    const [usersList, setUsersList] = useState<User[]>([]);

    const handleUsersPrint = async () => {
        const db = getDatabase();
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const usersArr = Array.isArray(usersData)
                ? usersData
                : Object.values(usersData);

            setUsersList(usersArr);
        }
    };

    return (
        <div className="bg-gray-200 mx-40 items-center">
            <button
                className="px-4 py-2 rounded-lg bg-blue-600"
                onClick={handleUsersPrint}
            >
                Print All Users
            </button>
            {usersList.length && (
                <ul className="list-decimal">
                    {usersList.map((user) => (
                        <li key={user.uid}>
                            {user.firstName} {user.lastName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUsersList;
