import { View, Text, StyleSheet } from "react-native"

import Header from "../../components/Header"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import { Feather } from "@expo/vector-icons"
import Icon from "../../components/icon"

const  List= () :JSX.Element => {
    return(
        <View style = {styles.container}>
            <Header />
    

        <View>
            <MemoListItem />
            <MemoListItem />
            <MemoListItem />
        

        </View>
        <CircleButton style={{top:160,bottom:'auto'}}>
            <Icon />
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