import { Button } from 'native-base';
import React,{useContext} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Firebase from '../FirebaseApi';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const auth = Firebase.auth();
const FeedbackScreen=({navigation})=>{
  const [userEmail,setUserEmail]=useState("");
  const { user,setUser } = useContext(AuthenticatedUserContext);
  useEffect(()=>{
    if(user){
      setUserEmail(user.email);
    }
  },[]);

 const handleSignOut = async () => {
  await auth.signOut()
  .then(()=>{
    console.log("logged out");
    console.log(user);
    setUser(null);
    AsyncStorage.removeItem('logined');
    navigation.replace('Login');
  })
  
   .catch((error)=>{
    console.log(error);
  })
};
  // const handleSignOut = async () => {
  //     console.log("logged out");
  //     await firebase.auth.signOut()
  //     .then(()=>{
  //       console.log("logged out");
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //     });
  // };

return(
    <View style={styles.container}>
	    <Text style={styles.text2} >Feed screen </Text>
      <Text style={styles.title}>Welcome !{userEmail}</Text>
       <Button onPress={handleSignOut} ><Text>Logout</Text></Button>
    </View>
)
}
export default FeedbackScreen;
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
