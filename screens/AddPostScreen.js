import React,{useState,useContext,useEffect} from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import {Container,InputField,InputWrapper} from '../styles/AddPostStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';
import PostCard from '../components/PostCard';

const AddPostScreen=()=>{
console.log('AddPostScreen');
return(
<View style={styles.container}>
<InputWrapper>
<InputField placeholder="What's on your mind?" multiline numberOfLines={4} />
</InputWrapper>
<ActionButton buttonColor="rgba(231,76,60,1)">
<ActionButton.Item buttonColor="#9b59b6" title="Take Photo" 
 onPress={()=>console.log('Take Photo taped!')}>
<Ionicons name='camera-outline' styles={styles.actionButtonIcon} />
</ActionButton.Item>
<ActionButton.Item buttonColor="#3498db" title="Choose Photo" 
 onPress={()=>console.log('Choose photo taped!')}>
<Ionicons name='md-images-outline' styles={styles.actionButtonIcon} />
</ActionButton.Item>
</ActionButton>

</View>
);
}
export default AddPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
