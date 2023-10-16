import { getDatabase, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { fetcher } from "../services/chatGptApi";
import { createPayload } from "../utilities/payloadUtility";
import LoadingSpinner from "./LoadingSpinner";

type PayloadRequest = {
    model: string;
    messages: { role: string; content: string }[];
    temperature: number;
};

const IdeaPlanner = () => {
    const uid = useAuth()?.uid;
    const [userIdea, setUserIdea] = useState("");
    const [apiPayload, setApiPayload] = useState<PayloadRequest | null>(null);
    const [submittedIdea, setSubmittedIdea] = useState("");
    const [chatResult, setChatResult] = useState("");

    const { data, error, isLoading } = useSWR(
        apiPayload ? apiPayload : null,
        fetcher
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const payload = createPayload(userIdea);
        setSubmittedIdea(userIdea);

        setApiPayload(payload);
    };

    useEffect(() => {
        if (data) {
            setChatResult(data);
            setApiPayload(null);
            const saveToDatabase = async () => {
                const db = getDatabase();

                const newKey = push(ref(db, `ideas_plan/${uid}`)).key;

                if (newKey) {
                    const newIdeaPlanRef = ref(
                        db,
                        `ideas_plan/${uid}/${newKey}`
                    );

                    try {
                        await set(newIdeaPlanRef, {
                            idea: submittedIdea,
                            plan: data,
                        });
                    } catch (error: any) {
                        console.log(error.message);
                    }
                }
            };
            saveToDatabase();
        }
    }, [data, uid, submittedIdea]);

    return (
        <div className="mt-10 h-full flex flex-col px-80">
            <div>
                {error && error.length !== 0 && (
                    <div className="mb-6">
                        <div className="relative z-0">
                            <label className="absolute text-xl text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {error}
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter your Unique Idea here:
                </label>
                <div className="flex flex-row items-center space-x-4">
                    <input
                        type="text"
                        id="small-input"
                        value={userIdea}
                        onChange={(e) => setUserIdea(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                        type="button"
                        className="w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                    >
                        Provide a Plan
                    </button>
                </div>
            </div>
            {isLoading && (
                <div className="mt-6">
                    <LoadingSpinner />
                </div>
            )}
            {chatResult && (
                <div className="mt-6 dark:text-white text-lg">{chatResult}</div>
            )}
        </div>
    );
};

export default IdeaPlanner;
