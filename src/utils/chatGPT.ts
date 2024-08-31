// src/utils/chatGPT.ts
import axios from 'axios';
import Config from 'react-native-config'; // 正しいモジュールを使用

const CHATGPT_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

export const fetchChatGPTResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      CHATGPT_API_URL,
      {
        prompt,
        max_tokens: 150, // 必要に応じて調整
        temperature: 0.7, // 創造性の設定、調整可能
      },
      {
        headers: {
          'Authorization': `Bearer ${Config.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    throw new Error('Failed to fetch response from ChatGPT');
  }
};
