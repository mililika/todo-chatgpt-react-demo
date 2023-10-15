export const createPayload = (userMessage: string) => {
    return {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    };
};
  