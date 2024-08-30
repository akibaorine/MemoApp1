import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase'; // Firebase Storage のインポート
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const uploadImageAsync = async (uri: string): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('ユーザーがログインしていません');
  }

  const response = await fetch(uri);
  const blob = await response.blob();
  const fileRef = ref(storage, `profile_images/${user.uid}`);
  
  await uploadBytes(fileRef, blob);
  const downloadURL = await getDownloadURL(fileRef);

  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, { profileImage: downloadURL });

  return downloadURL;
};