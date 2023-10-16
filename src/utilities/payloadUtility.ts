export const createPayload = (userMessage: string) => {
    return {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Plese provide short plan of realization this idea: ${userMessage}. Max in 1 sentence`}],
      temperature: 0.7,
    };
};
  