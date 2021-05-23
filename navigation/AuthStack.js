import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, FlatList, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import AppStack from '../navigation/AppStack';
const Stack=createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch,setIsFirstLaunch]=useState(null);
  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    });
  },[]);
  let routeName;
  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => null}}
      />
<Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
         options={({navigation}) => ({
          title: '',
          
        })}
      />
      
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{header: () => null}}
      />
 <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      
 {/* <Stack.Screen
        name="forget password"
        component={forgotpassword}
        options={{header: () => null}}
      /> */}
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              
            </View>
          ),
        })}
      />
    </Stack.Navigator></NavigationContainer>
  )};

export default AuthStack;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});