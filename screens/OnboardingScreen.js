import Onboarding from 'react-native-onboarding-swiper';
import React,{useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Image,Text,useState,TouchableOpacity} from 'react-native'
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
      <View 
          style={{
              width:6,
              height: 6,
              marginHorizontal: 3,
              backgroundColor
          }}
      />
  );
}

const Skip = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen=({navigation})=>{
    return(
<Onboarding
  SkipButtonComponent={Skip}
  NextButtonComponent={Next}
  DoneButtonComponent={Done}
  DotComponent={Dots}
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.navigate('Login')}

  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={img1} />,
      title: 'Welcome',
      subtitle: 'Swipe right for details',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={img2} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={img1} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
        
  ]}
/>
)
}
export default OnboardingScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });