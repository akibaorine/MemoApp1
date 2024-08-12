import { View, StyleSheet } from "react-native"

import Header from "../../components/Header"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
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
        <CircleButton style={{top:700,bottom:'auto'}}>
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