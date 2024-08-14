import { View,Text,  StyleSheet } from "react-native"


import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import { router, useNavigation } from "expo-router"
import { useEffect } from "react"
import LogOutButton from "../../components/LogOutButton"

const handlePress=():void =>{
    router.push('/memo/create')
}

const  List= () :JSX.Element => {
    const navigation=useNavigation()
    useEffect(() =>{
    
        navigation.setOptions({
            headerRight:()=>{return <LogOutButton />}
        })

    },[])
    
    
    return(
        <View style = {styles.container}>

        <View>
            <MemoListItem />
            <MemoListItem />
            <MemoListItem />
        </View>
        <CircleButton style={{top:650,bottom:'auto'}} onPress={handlePress}>
            <Icon name='plus' size={40} color='#ffffff'/>
        </CircleButton>
        

    </View>
        
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
   
   
    
})

export default List