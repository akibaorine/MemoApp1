import { View,Text,StyleSheet,TouchableOpacity,Alert } from 'react-native'

import {Link, router, useLocalSearchParams} from 'expo-router'
import { deleteDoc,doc } from 'firebase/firestore'

import Icon from './icon'
import {type Memo } from '../../types/memo'
import { Timestamp } from 'firebase/firestore'
import { auth,db } from '../config'

interface Props {
    memo:Memo
}

const handlePress = (id:string):void => {
    if(auth.currentUser === null) {return}
    const ref = doc(db,`users/${auth.currentUser.uid}/memos`,id)
    Alert.alert('メモを削除します','宜しいですか？',[
        {
            text:'キャンセル'
        },
        {
            text:'削除する',
            style:'destructive',
            onPress :() => {
                deleteDoc(ref)
                 .catch(() => {Alert.alert('削除に失敗しました')})
            }

        }
    ])

}

const handlePress2 = (id:string):void => {
    router.push({pathname: '/memo/edit',params:{id}})
}


const MemoListItem = (props:Props):JSX.Element | null => {
    const id = String(useLocalSearchParams().id)
    const {memo} =props
    const {bodyText,updatedAt} = memo
    if (bodyText === null || updatedAt === null) {return null}
    const dateString = memo.updatedAt instanceof Timestamp
    ? updatedAt.toDate().toLocaleString('ja-JP')
    : 'Date not available'

    return(
        <Link 
        href = {{pathname:'memo/detail', params:{id:memo.id}}}
        asChild
        >
        <TouchableOpacity style={styles.memoListItem}>
              <View>
                <Text numberOfLines={1} style={styles.memoListItemTitile}>{bodyText}</Text>
                <Text style={styles.memoListItemDate}>{dateString}</Text>
              </View> 

              <View style = {styles.iconContainer}>
                <TouchableOpacity onPress = {() => {handlePress2(id)}} >
                    <View style={styles.iconBox}>
                <Icon name='pencil' size={50} color='#B0B0B0' />
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress = {() => {handlePress(memo.id)}}>
              
                <Icon name='delete' size={32} color='#B0B0B0' />
              </TouchableOpacity>
              </View>
             </TouchableOpacity>
             </Link>

    )
}

const styles = StyleSheet.create({
    memoListItem:{
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:16,
        paddingHorizontal:19,
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.15)'
    },
    memoListItemTitile:{
        fontSize:16,
        lineHeight:32
    },
    memoListItemDate:{
        fontSize:12,
        lineHeight:16,
        color:'#848484'
    },
    iconContainer:{
        flexDirection:'row'
    },
    iconBox:{
        backgroundColor:'#D3D3D3',
        padding:1,
        borderRadius:8
    }

})

export default MemoListItem