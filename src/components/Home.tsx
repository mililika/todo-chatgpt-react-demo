import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CardComponent from "./CardComponent";
import LoadingSpinner from "./LoadingSpinner";

type UserIdea = {
    idea: string;
    plan: string;
};

const Home = () => {
    const uid = useAuth()?.uid;
    const [userIdeas, setUserIdeas] = useState<UserIdea[] | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserIdeas = async () => {
            const db = getDatabase();
            const userIdeasRef = ref(db, `ideas_plan/${uid}`);
            const snapshot = await get(userIdeasRef);
            if (snapshot.exists()) {
                const userIdeasData = snapshot.val();
                setUserIdeas(
                    Array.isArray(userIdeasData)
                        ? userIdeasData
                        : Object.values(userIdeasData)
                );
            }

            setLoading(false);
        };

        fetchUserIdeas();
    }, [uid]);

    return (
        <div className="flex dark:bg-gray-800 justify-center">
            {loading ? (
                <LoadingSpinner />
            ) : userIdeas.length !== 0 ? (
                <div className="mt-10 px-20 flex flex-col space-y-4">
                    {userIdeas
                        .map((idea, index) => (
                            <CardComponent
                                key={index}
                                title={idea.idea}
                                description={idea.plan}
                            />
                        ))
                        .reverse()}
                </div>
            ) : (
                <div>There is no ideas</div>
            )}
        </div>
    );
};

export default Home;
