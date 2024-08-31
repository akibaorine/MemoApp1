import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync, saveImageUrlToMemo } from '../utils/firebaseStorage';

const ImageUpload = ({ memoId }: { memoId: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      try {
        const uploadUrl = await uploadImageAsync(uri);
        setSelectedImage(uploadUrl);
        await saveImageUrlToMemo(memoId, uploadUrl);
        Alert.alert('成功', '画像がアップロードされ、メモに保存されました。');
      } catch (error) {
        Alert.alert('エラー', '画像のアップロードに失敗しました。');
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Text>画像を選択</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

export default ImageUpload;
