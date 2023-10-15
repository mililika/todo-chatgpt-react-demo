import axios from "axios";

const chatApi = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_CHAT_GPT_SECRET_KEY}`
    }
});

export const fetcher = async (payload: object) => {
    try {
        const response = await chatApi.post('', payload); 
        return response.data.choices[0].message.content; 
    } catch (error: any) {
        throw error;
    }
 };