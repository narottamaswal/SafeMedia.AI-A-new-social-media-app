import React from 'react';
import Providers from './navigation/index';
import * as firebase from 'firebase';
import {firebaseConfig } from './FirebaseApi';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView ,TextInput,Platform,Image,Dimensions,ScrollView} from 'react-native';

import AuthProvider from './navigation/AuthProvider';


const {height,width}=Dimensions.get('window')

export default class App extends React.Component {
  componentDidMount() {
   
    this.startHeaderHeight = 80;
    if (Platform.OS == 'android') {
        this.startHeaderHeight = 100 + StatusBar.currentHeight
    }
   	if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
console.log("database connected");
	}

}
render(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: this.startHeaderHeight, flex:1,marginTop: Platform.OS == 'android' ? 30 : null}} >
           <Providers/>
     </View>
</SafeAreaView>

);}
}; 