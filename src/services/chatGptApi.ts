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
        console.log('Payload:', payload);
        const response = await chatApi.post('', payload); 
        console.log('Response:', response);
        return response.data.choices[0].message.content; 
    } catch (error: any) {
        console.log('API error:', error.response ? error.response.data : error.message);
        throw error;
    }
 };