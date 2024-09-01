import { View, Text, ScrollView, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import { onSnapshot, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { auth, db } from "../../config";
import { type Memo } from "../../../types/memo";

const handleEditPress = (id: string): void => {
    router.push({ pathname: '/memo/edit', params: { id } });
};

const handleQuestionPress = (): void => {
    alert('質問ボタンが押されました！');
};

const Detail = (): JSX.Element => {
    const id = String(useLocalSearchParams().id);
    console.log(id);
    const [memo, setMemo] = useState<Memo | null>(null);

    useEffect(() => {
        if (auth.currentUser === null) { return; }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            const { bodyText, updatedAt } = memoDoc.data() as Memo;
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatedAt
            });
        });
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleDateString('ja-JP')}</Text>
            </View>

            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memo?.bodyText}
                </Text>
            </ScrollView>

            <CircleButton onPress={() => handleEditPress(id)} style={styles.editButton}>
                <Icon name='pencil' size={35} color='#ffffff' />
            </CircleButton>

            <CircleButton onPress={handleQuestionPress} style={styles.questionButton}>
                <Icon name='question' size={35} color='#ffffff' />
            </CircleButton>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF'
    },
    memoHeader: {
        backgroundColor: '#48D1CC',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19
    },
    memoTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold'
    },
    memoDate: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16
    },
    memoBody: {
        paddingHorizontal: 27
    },
    memoBodyText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24,
        color: '#000000'
    },
    editButton: {
        position: 'absolute',
        right: 50,
        bottom: 615,
    },
    questionButton: {
        position: 'absolute',
        right: 23,
        bottom: 100, // 編集ボタンの上に配置
    }
});

export default Detail;
