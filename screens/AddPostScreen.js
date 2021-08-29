import React,{useState,useContext,useEffect} from 'react';
import {Text,View,StyleSheet,FlatList,Alert,ActivityIndicator} from 'react-native';
import {Container,InputField,InputWrapper,SubmitBtn,SubmitBtnText,StatusWrapper,submitPost,AddImage} from '../styles/AddPostStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';
import PostCard from '../components/PostCard';
import {AuthContext} from '../navigation/AuthProvider';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';

import "firebase/firestore";
import "firebase/storage";
import * as firebase from 'firebase';

//import firestore from '@react-native-firebase/firestore';
const AddPostScreen=()=>{
console.log(AuthContext);
  const {user,logout} = useContext(AuthContext);
  console.log(user);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  console.log('AddPostScreen',user,user.uid);
  const options={mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child("my-image");
  return ref.put(blob);
    }
  };
  const clickImage = async () => {
    let result = await ImagePicker.launchCameraAsync(options);
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    
  
  const submitPost = async () => {
    console.log("submit");
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);
    const dbh = firebase.firestore();

    dbh
    .collection('posts')
    .add({
      userId: "1",
      post: post,
      postImg: imageUrl,
     // postTime: firebase.firestore().Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const uploadImage = async () => {
    console.log("till1");

    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);
   console.log("till2",filename);
    console.log(filename);
    const res = await fetch(uploadUri);
    const blob = await res.blob();
    var storageRef = firebase.storage().ref().child("images/"+filename);
    console.log("till3");
    const task = storageRef.put(blob);
    console.log("tillw");

    task.on('state_changed', (taskSnapshot) => {
      console.log(taskSnapshot.bytesTransferred+" transferred out of "+taskSnapshot.totalBytes);

       setTransferred(
         Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100
       );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      console.log("url");
      console.log(url);

      setUploading(false);
      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };



return(
  <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}

        <InputField
          placeholder="What's on your mind ?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => {setPost(content);console.log(post);}}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={clickImage}
          >
          <Ionicons name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={pickImage}
          >
          <Ionicons name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});