import {Stack } from "expo-router"; 

const Layout = ():JSX.Element =>{
    return <Stack screenOptions={{
        headerStyle:{
            backgroundColor:'#48D1CC'
        },
        headerTintColor:'#ffffff',
        headerTitle:'SONAERU',
        headerBackTitle:'Back',
        headerTitleStyle:{
            fontSize:22,
            fontWeight:'bold'
        }

    }} />
}

export default Layout
