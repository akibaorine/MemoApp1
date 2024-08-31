import React from 'react';
import { View, Text, Button } from 'react-native';
import { fetchChatGPTResponse } from '../../utils/chatGPT';
import Config from 'react-native-config';

const ExampleComponent = () => {
  const handleFetchResponse = async () => {
    try {
      const prompt = 'Hello, how are you?';
      const response = await fetchChatGPTResponse(prompt);
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
