import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./services/chatGptApi";
import { createPayload } from "./utilities/payloadUtility";

interface PayloadRequest {
    model: string;
    messages: { role: string; content: string }[];
    temperature: number;
}

function App() {
    const [userMessage, setUserMessage] = useState("");
    const [apiPayload, setApiPayload] = useState<PayloadRequest | null>(null);

    const { data, error, isLoading } = useSWR(
        apiPayload ? apiPayload : null,
        fetcher
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setApiPayload(createPayload(userMessage));
        console.log("API Payload:", apiPayload);
    };

    if (error) console.log(error.message);

    return (
        <div>
            <input
                type="text"
                placeholder="Input the text here"
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            {isLoading ? (
                <div>ChatGPT Is Loading</div>
            ) : (
                <>
                    <div>Here is output from chatGPT</div>
                    <div className="text-bold">{data}</div>
                </>
            )}
        </div>
    );
}

export default App;
