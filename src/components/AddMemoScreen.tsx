// AddMemoScreen.tsx
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { uploadImageAsync } from '../utils/firebaseStorage'; // Firebase Storageに画像をアップロードする関数
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config'; // Firebase設定ファイル

const AddMemoScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const imageUrl = selectedImage ? await uploadImageAsync(selectedImage) : null;
      const memoData = {
        title,
        bodyText,
        imageUrl,
        updatedAt: new Date(),
      };
      await setDoc(doc(db, `users/${auth.currentUser.uid}/memos`, new Date().toISOString()), memoData);
      Alert.alert('Success', 'Memo added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add memo');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Body Text"
        value={bodyText}
        onChangeText={setBodyText}
      />
      <Button title="Save Memo" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default AddMemoScreen;
