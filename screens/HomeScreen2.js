import React,{SafeAreaView,useState,useContext,useEffect} from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import {Container} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';
const posts=[
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
const HomeScreen2=()=>{
console.log('home screen2');
return(
<Container>
<FlatList data={posts} renderItem={(item)=><PostCard item={item}/>}
 keyExtractor={item=>item.id}
 showsVerticalScrollIndicator={false}
/>


</Container>
);
}
export default HomeScreen2;
