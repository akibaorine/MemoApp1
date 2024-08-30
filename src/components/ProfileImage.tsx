import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";  // ここで auth がインポートされます
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

const ProfileImage = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!auth.currentUser) return;  // ここで auth が使用されます

      const userRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setImageURL(docSnap.data()?.profileImage || null);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <View>
      {imageURL ? <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} /> : null}
    </View>
  );
};

export default ProfileImage;
