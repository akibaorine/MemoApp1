// src/components/ExampleComponent.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { fetchChatGPTResponse } from '../utils/chatGPT'; // 修正後の関数をインポート
import Config from 'react-native-config'; // 環境変数をインポート

const ExampleComponent = () => {
  const handleFetchResponse = async () => {
    try {
      const prompt = 'Hello, how are you?'; // メモの1行目などからプロンプトを設定
      const response = await fetchChatGPTResponse(prompt); // APIキーは内部で設定されているため、ここでは渡さない
      console.log(response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <View>
      <Text>ChatGPT API Example</Text>
      <Button title="Fetch Response" onPress={handleFetchResponse} />
    </View>
  );
};

export default ExampleComponent;
