declare module '../utils/chatGPT' {
    export const fetchChatGPTResponse: (prompt: string, apiKey: string) => Promise<string>;
  }