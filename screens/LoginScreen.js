import React,{useState,useContext,useEffect} from 'react'
import {StyleSheet,SafeAreaView, View, Image,Text,TouchableOpacity} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import img1 from "../assets/img1.png";
import FormInputField from '../components/FormInputField';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import RegistrationScreen from './RegistrationScreen';
import AppStack from '../navigation/AppStack';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Firebase from '../FirebaseApi';

const auth = Firebase.auth();

const LoginScreen = ({navigation})=>{
 const [isLogined,setIsLogined]=useState(null);
 const [isFirstLaunch,setIsFirstLaunch]=useState(null);

 const [error,setError]=useState("");
 console.log("ji");
 console.log(navigation);
 const [email,setEmail] = useState();
 const [password,setPassword] = useState();

  useEffect(()=>{
    AsyncStorage.getItem('logined').then(value=>{
      if(value==null || value=='false'){
        AsyncStorage.setItem('logined','true');
        setIsFirstLaunch(true);
      }

	else{
	navigation.replace('AppStack');
        setIsFirstLaunch(false);
      }
    });
  },[]);

	
  const onLogin = async (email,password) => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
	const login=(email,password)=>{
	auth.signInWithEmailAndPassword(email,password)
	.then(()=>{
		navigation.replace('AppStack');
	}).catch((e)=>{
		setError(e.message);
		console.log(e.message);
	});
	}
    return(
        <View style={styles.container}>
          <Image source={img1} style={styles.logo}/>
          <Text style={styles.text}>Login</Text>
          <FormInputField
          labelValue={email} 
          placeholder="Email" iconType="user" 
          keyboardType='email-address' autoCapitalize="none" 
          onChangeText={(userEmail)=>{
            
            setEmail(userEmail); 
            if(userEmail.length<6){
              setError("email should be 6 letters");
            }   
            
          }} 
      autoCorrect={false}/>

          <FormInputField
          labelValue={password} 
          placeholder="Password" iconType="lock"  secureTextEntry={true}

          onChangeText={(userPassword)=>{setPassword(userPassword)}} />
	<Text>{error}</Text>
          <FormButton buttonTitle="Sign In" onPress={()=>login(email,password)}/>

          
        <SocialButton buttonTitle="Sign In with Google" btnType="google" 
        color="#de4d41" backgroundColor="#f5e7ea"/>
<TouchableOpacity style={styles.forgotButton} onPress={()=>{}}>
            <Text style={styles.navButtonText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton} 
          onPress={()=>{console.log("jii");
          console.log(navigation);navigation.navigate('Registration')}}>
            <Text style={styles.navButtonText}>New Account ? Register Here</Text>
          </TouchableOpacity>

     </View>
    )
}


export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',padding:20,backgroundColor: '#f9fafd',
  },
  logo: {
    height: 200,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});