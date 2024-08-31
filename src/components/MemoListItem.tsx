import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Button, TextInput } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import Icon from './icon';
import { type Memo } from '../../types/memo';
import { Timestamp } from 'firebase/firestore';
import { auth, db } from '../config';
import { useState } from 'react';

interface Props {
  memo: Memo;
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) { return; }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert('メモを削除します', '宜しいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
          .catch(() => { Alert.alert('削除に失敗しました'); });
      }
    }
  ]);
};

// コメントアウト: handlePress2 関数
// const handlePress2 = (id: string): void => {
//   router.push({ pathname: '/memo/edit', params: { id } });
// };

const MemoListItem = (props: Props): JSX.Element | null => {
  const id = String(useLocalSearchParams().id);
  const { memo } = props;
  const { bodyText, updatedAt } = memo;
  const [title, setTitle] = useState<string>(''); // タイトル用の state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 選択した画像のURIを保存
    }
  };

  if (bodyText === null || updatedAt === null) { return null; }
  const dateString = memo.updatedAt instanceof Timestamp
    ? updatedAt.toDate().toLocaleString('ja-JP')
    : 'Date not available';

  return (
    <Link
      href={{ pathname: 'memo/detail', params: { id: memo.id } }}
      asChild
    >
      <TouchableOpacity style={styles.memoListItem}>
        <View style={styles.contentContainer}>
          {/* 画像選択ボタンとプレビュー */}
          <View style={styles.imageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            ) : (
              <Button title="画像" onPress={pickImage} />
            )}
          </View>

          {/* タイトル入力欄 */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="品名"
            style={styles.titleInput}
          />

          {/* テキストボックス */}
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
            <Text style={styles.memoListItemDate}>{dateString}</Text>
          </View>

          {/* コメントアウト: 編集ボタン */}
          {/* <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => { handlePress2(id); }}>
              <View style={styles.iconBox}>
                <Icon name='pencil' size={50} color='#B0B0B0' />
              </View>
            </TouchableOpacity>
          </View> */}

          {/* 削除ボタン */}
          <TouchableOpacity onPress={() => { handlePress(memo.id); }}>
            <Icon name='delete' size={32} color='#B0B0B0' />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoListItem: {
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  contentContainer: {
    flexDirection: 'row', // 横並びに設定
    alignItems: 'center', // 垂直方向のセンタリング
    justifyContent: 'flex-start', // 左寄せ
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // 画像選択ボタンとタイトルの間隔
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 10, // 画像と選択ボタンの間隔
  },
  titleInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    width: 100, // タイトルの横幅
    marginRight: 10, // タイトルとテキストボックスの間隔
  },
  textContainer: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 4,
    borderBlockColor: '#E0E0E0',
    width: 150,
    marginRight: 10, // テキストボックスと編集ボタンの間隔
  },
  memoListItemTitle: {
    fontSize: 12,
    lineHeight: 20,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10, // 編集ボタンと削除ボタンの間隔
  },
  iconBox: {
    backgroundColor: '#D3D3D3',
    padding: 1,
    borderRadius: 8,
  },
});

export default MemoListItem;
