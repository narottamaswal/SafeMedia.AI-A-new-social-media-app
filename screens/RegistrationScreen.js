import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image,Platform, StyleSheet} from 'react-native';
import FormInputField from '../components/FormInputField';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import img1 from "../assets/img2.png";
import * as firebase from 'firebase';

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
const validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    setError("Email is Not Correct");
    setEmail(text);
    return false;
  }
  else {
  setEmail(text);
  console.log("Email is Correct");
  }
}
	const register=(email,password,confirmPassword)=>{
    		if(!password || !confirmPassword){
			setError("Password cannot be blank");
		}
		if(password){
			if(password==confirmPassword){
		firebase.auth().createUserWithEmailAndPassword(email,password)
		.then(()=>{
			alert('Registered ! Login Now')
			navigation.navigate('Login');
		}).catch((e)=>{
			alert(e.message)
			console.log(e.message);	
		});
		}
		else{
			setError("Password does not match, Try again");
		}
	}
		
	}
  
  return (
    <View style={styles.container}>
                  <Image source={img1} style={styles.logo}/>

      <Text style={styles.text}>Create an account</Text>

      <FormInputField
        labelValue={email}
        onChangeText={(userEmail) => validate(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInputField
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInputField
        labelValue={confirmPassword}
        onChangeText={(userPassword) => {
		setConfirmPassword(userPassword);
		
		}
	}
        
	placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
	<Text>{error}</Text>
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email,password,confirmPassword)}
      />

	
      {Platform.OS === 'android' ? (
        
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f9fafd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
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
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
});