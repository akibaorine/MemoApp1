import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { doc, updateDoc } from 'firebase/firestore';
import { auth,db } from '../config'; // Firestore のインスタンスをインポート

export async function uploadImageAsync(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob(); // Fetch API を使って Blob を取得

  const storage = getStorage();
  const fileRef = ref(storage, `images/${uuid.v4()}`);
  
  // Blob オブジェクトをアップロード
  await uploadBytes(fileRef, blob);

  // アップロードした画像のダウンロード URL を取得
  return await getDownloadURL(fileRef);
}

// 画像 URL をメモに保存する関数
export async function saveImageUrlToMemo(memoId: string, imageUrl: string): Promise<void> {
  const memoRef = doc(db, `users/${auth.currentUser?.uid}/memos`, memoId);
  await updateDoc(memoRef, {
    imageUrl: imageUrl, // 画像 URL を保存するフィールド
  });
}
