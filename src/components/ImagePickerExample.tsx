import React, { useState } from 'react';
import {  Image, View, StyleSheet,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // ユーザーに写真のアクセス許可を求める
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("画像を選択するにはアクセス許可が必要です！");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
    {/* 条件付きレンダリングの確認 */}
    {selectedImage ? (
      <Image source={{ uri: selectedImage }} style={styles.image} />
    ) : (
      <Button title="画像を選択" onPress={pickImage} />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 5,
  },
});