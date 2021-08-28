import React,{useState,useContext,useEffect} from 'react'
import {Text,View,StyleSheet,FlatList} from 'react-native';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';

import {Container} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';




const HomeScreen=({navigation})=>{
console.log("yede");
console.log(navigation);

const logout=()=>{
 AsyncStorage.getItem('logined').then(value=>{
	console.log(value);
	console.log("a");
        AsyncStorage.setItem('logined','false');
        setIsFirstLaunch(true);
      
    });
	firebase.auth().signOut().then(()=>{
		alert('Logged out');
  
		navigation.navigate('Login');
	}).catch((e)=>{
		console.log(e.message);		
	});
}
return(


    <View style={styles.container}>
	    <Text style={styles.text2}>Home</Text>
        <Text style={styles.text}>Welcome, Narottam</Text>
        <Text style={styles.text}>@Narottam18</Text>

	<FormButton buttonTitle='Logout' onPress={()=>logout()}/>

    </View>)
}
export default HomeScreen;
const styles=StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', backgroundColor: '#f9fafd',
        justifyContent: 'center',padding:20
      },
      logo: {
        height: 200,
        width: 150,
        resizeMode: 'cover',
      },
      text: {
        fontSize: 20,
        color: '#333333',
      },     text2: {
    fontSize: 28,
    marginBottom: 50,
    color: '#051d5f',
  },
})
