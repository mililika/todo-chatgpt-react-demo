export const createPayload = (userMessage: string) => {
    return {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `
        Keep always these rules:
        Headings: Enclose with <h1> and </h1> tags.
        Subheadings: Enclose with <h3> and </h3> tags.
        Lists:
        For non-numbered lists, wrap the entire list with <ol> and </ol> tags. Each item within the list should be enclosed with <li> and </li> tags.
        For numbered lists, use <ul> and </ul> tags for the entire list. Similarly, each item should be wrapped with <li> and </li> tags.
        All other text: Enclose with <p> and </p> tags.
        `
      },
      { 
        role: "user", 
        content: `Plese provide short step by step plan of realization this idea: ${userMessage}. Max in 7 steps. `}],
      temperature: 0.7,
    };
};
  