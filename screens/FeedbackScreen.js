import { Button } from 'native-base';
import React,{useContext} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
const FeedbackScreen=({navigation})=>{

console.log("yede");
console.log(navigation);

const logout=()=>{
  navigation.replace('AppStack');
  AsyncStorage.getItem('logined').then(value=>{
    if(value){
      AsyncStorage.setItem('logined','trfalseue');
      setIsFirstLaunch(true);
    }
  });
}
return(
    <View style={styles.container}>
	    <Text style={styles.text2} >Feed screen </Text>
       <Button onPress={logout} ><Text>hello</Text></Button>
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
