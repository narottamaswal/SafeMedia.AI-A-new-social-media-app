import React,{SafeAreaView,useState,useContext,useEffect} from 'react';
import {Text,View,StyleSheet,FlatList,Alert} from 'react-native';
import {Container} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import PostCard from '../components/PostCard';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


import { List } from 'native-base';
const posts2=[
{
 id:'1',userName:"Narottam Aswal",
userImg:require('../assets/UserImages/user.png')
,postTime:"4 mins ago",postText:"This is my first post on my application",postImg:require('../assets/img1.png'),liked:true,likes:'14',
'comments':'5'},{ id:'2',userName:"Narottam Aswal",
userImg:require('../assets/UserImages/user.png')
,postTime:"4 mins ago",postText:"This is my first post on my application,This is my first post on my application",postImg:"none",liked:false,likes:'14',
'comments':'5'},{
 id:'3',userName:"Narottam Aswal",
userImg:require('../assets/UserImages/user.png')
,postTime:"4 mins ago",postText:"This is my first post on my application",postImg:require('../assets/img1.png'),liked:true,likes:'14',
'comments':'5'},{ id:'4',userName:"Narottam Aswal",
userImg:require('../assets/UserImages/user.png')
,postTime:"4 mins ago",postText:"This is my first post on my application,This is my first post on my application",postImg:"none",liked:false,likes:'14',
'comments':'5'}


];  

const HomeScreen2=({navigation})=>{
    
    const [posts,setPosts] = useState([]);
    const [load,setLoad] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [deleted,setDeleted]= useState(false);
    const fetchPosts=async()=>{
        console.log("fetchposts");
            try{
                const list=[];
               await firebase.firestore().collection('posts')
               .orderBy('postTime','desc')
               .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach(doc => {
                        console.log(doc.data());
                        const {post,postImg,postTime,likes,comments,userId} = doc.data();
                        console.log(post,postImg,postTime);
                        list.push({
                            id:doc.id,
                            userId,
                            userName:"Narottam Aswal",
                            userImg:"https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
                            postTime,
                            postText:post,
                            postImg:postImg,
                            liked:false,
                            likes,
                            comments});
                    });
                    setPosts(list);
                    console.log(list);
                    setLoad(true);
                    if(isLoading){
                        setIsLoading(false);
                    }
                    // console.log("Total connection",querySnapshot.size);
                });
               console.log(list);
            }catch(e){
              console.log(e.message);
            }
        };


        const DeletePost=async(postId)=>{
            console.log("delete");

            console.log(postId);
            await firebase.firestore().collection('posts').doc(postId).get().then(documentSnapshot=>{
                if(documentSnapshot.exists){
                    const {postImg} = documentSnapshot.data();
                    if(postImg!=null){
                        var storageRef = firebase.storage().refFromURL(postImg);
                        var imageRef =  firebase.storage().ref(storageRef.fullPath);
                        imageRef.delete().then(()=>{
                            console.log("Image deleted");
                            deleteFireStoreData(postId);
                            setDeleted(true);
                        }).catch((e)=>{
                            console.log(e.message);
                        });
                    }else{
                        console.log("Image deleted");
                        deleteFireStoreData(postId);
                                                    setDeleted(true);

                    }
                }
            });

        }
  useEffect(()=>{
  fetchPosts();
  },[]
  );  
useEffect(()=>{
 fetchPosts();
setDeleted(false);
},[deleted]);
  const deleteFireStoreData=async(postId)=>{
    await firebase.firestore().collection('posts').doc(postId).delete().then(()=>{
        Alert.alert(
            'Post Deelted!',
            'Your post has been deleted Successfully!',
          );
    }).catch((e)=>{
        console.log(e.message);
    })
  }
console.log('home screen2');
return(

    
<Container>{ !isLoading && 
<FlatList data={posts} renderItem={(item)=><PostCard item={item} 
onDelete={DeletePost} onPress={()=>navigation.navigate('HomeProfileScreen',{userId:item.userId})}
/>
}
 keyExtractor={item=>item.id}
 showsVerticalScrollIndicator={false}
/>
}

</Container>
);
}
export default HomeScreen2;
