import { View,Text,  StyleSheet,FlatList } from "react-native"
import {collection, onSnapshot,query,orderBy} from 'firebase/firestore'

import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import { router, useNavigation } from "expo-router"
import { useEffect,useState } from "react"
import LogOutButton from "../../components/LogOutButton"
import { db,auth } from "../../config"
import {type Memo} from "../../../types/memo"

const handlePress=():void =>{
    router.push('/memo/create')
}

const  List= () :JSX.Element => {
    const [memos,setMemos] = useState<Memo[]>([])
    const navigation=useNavigation()
    useEffect(() =>{
        navigation.setOptions({
            headerRight:()=>{return <LogOutButton />}
        })
    },[])
    useEffect(() => {
        console.log('auth.currentUser:',auth.currentUser);
        if(auth.currentUser === null) {return}
        const ref = collection(db,`users/${auth.currentUser.uid}/memos`)
        console.log('Query path:', `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy('updatedAt','desc'))
        console.log('Query created',ref.path)
        const unsubscribe = onSnapshot(q,(snapshot) => {
            if(snapshot.empty) {
                console.log('No matchung')
                return
            }
            console.log('onSnapshot called')
            const remoteMemos:Memo[] = []
            snapshot.forEach((doc) => {
                
                              const {bodyText, updatedAt} = doc.data()
                remoteMemos.push({
                    id:doc.id,
                    bodyText,
                    updatedAt
                })
            })
            setMemos(remoteMemos)
            console.log('memo updated:',remoteMemos)
        })
        return unsubscribe
    },[])
    
    
    return(
        <View style = {styles.container}>
            <FlatList 
            data={memos}
            renderItem={({item}) =>  <MemoListItem memo = {item} />} 
            />

        <CircleButton style={{top:650,bottom:'auto'}} onPress={handlePress}>
            <Icon name='plus' size={40} color='#ffffff'/>
        </CircleButton>
        

    </View>
        
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF'
    },
   
   
    
})





export default List