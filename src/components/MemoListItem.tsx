import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'

import {Link} from 'expo-router'

import Icon from './icon'
import {type Memo } from '../../types/memo'
import { Timestamp } from 'firebase/firestore'

interface Props {
    memo:Memo
}

const MemoListItem = (props:Props):JSX.Element | null => {
    const {memo} =props
    const {bodyText,updatedAt} = memo
    if (bodyText === null || updatedAt === null) {return null}
    const dateString = memo.updatedAt instanceof Timestamp
    ? updatedAt.toDate().toLocaleString('ja-JP')
    : 'Date not available'

    return(
        <Link href='/memo/detail'asChild>
        <TouchableOpacity style={styles.memoListItem}>
              <View>
                <Text numberOfLines={1} style={styles.memoListItemTitile}>{bodyText}</Text>
                <Text style={styles.memoListItemDate}>{dateString}</Text>
              </View>  
              <TouchableOpacity>
                <Icon name='delete' size={32} color='#B0B0B0' />
              </TouchableOpacity>
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
    }

})

export default MemoListItem