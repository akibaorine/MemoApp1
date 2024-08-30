import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"; // 正しいパスに修正
import * as ImagePicker from 'expo-image-picker';
import { Button, View, Image } from "react-native";
import { useState } from "react";

const ImageUpload = () => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // 画像を選択
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            const imageUrl = await uploadImageAsync(uri);
            await saveImageToFirestore(imageUrl);
        }
    };

    const uploadImageAsync = async (uri: string): Promise<string> => {
        const blob = await fetch(uri).then(r => r.blob());
        const storage = getStorage();
        const storageRef = ref(storage, `images/${auth.currentUser?.uid}/${Date.now()}`);
        await uploadBytes(storageRef, blob);
        return await getDownloadURL(storageRef);
    };

    const saveImageToFirestore = async (imageURL: string) => {
        if (!auth.currentUser) return;

        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, { profileImage: imageURL }, { merge: true });
    };

    return (
        <View>
            <Button title="画像を選択" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default ImageUpload;