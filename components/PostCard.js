import React,{useContext,useState} from 'react';
import {ImageBackground,Text,View,StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {Container, Card,UserInfo,UserImg,UserInfoText,PostTime,UserName,InteractionWrapper,Interaction,InteractionText, PostText, PostImg,Divider} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import moment from 'moment';
const PostCard=({item,onDelete,onPress})=>{
      const { user,setUser } = useContext(AuthenticatedUserContext);
const [username,setUsername] = useState(item['item'].userName);
console.log(item['item'].userName);
console.log(item['item'].postImg);
console.log(item['item'].postImg=="none");
console.log(item['item'].id);

console.log(item['item'].liked);
const likeIcon=item['item'].liked ? 'heart' : 'heart-outline';
const likeIconColor=item['item'].liked ? '#2e64e5' : '#333';
console.log("item time",moment(item['item'].postTime.toDate()).fromNow());
if(item.likes==1){
 likeText = '1 Like'
} else if(item.likes>1){
likeText = item.likes+ ' Likes';
}else{
 likeText='Like';
}

if(item.comments==1){
 commentText = '1 Comment'
} else if(item.comments>1){
commentText = item.comments+ ' Comments';
}else{
 commentText='Comment';
}
      return(
<Card>
<UserInfo>
   <UserImg source={{uri:item ? item['item'].userImg  ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
}}/>
     <UserInfoText>
      <TouchableOpacity >  
            <UserName>
            {username}
      {/* {item ? item['item'].userName  : null} */}
            
            </UserName>
            </TouchableOpacity>
          <PostTime>{moment(item['item'].postTime.toDate()).fromNow()}</PostTime>  
   </UserInfoText>  

 </UserInfo> 

 <PostText>{item['item'].postText}</PostText>
{item['item'].postImg==null ? <Divider/> : <PostImg source={{uri:item['item'].postImg}} /> }
 <InteractionWrapper>
<Interaction active={item['item'].liked}>
<Ionicons name={likeIcon} size={25} color={likeIconColor}/>
<InteractionText active={item['item'].liked}>{item['item'].likes}{likeText}</InteractionText>
</Interaction>
<Interaction >
<Ionicons name='md-chatbubble-outline' size={25}/>
<InteractionText>{item['item'].comments}{commentText}</InteractionText>
</Interaction>
{
      user.uid==item['item'].userId ?

<Interaction onPress={()=>{
      onDelete(item['item'].id)}
      }>
<Ionicons name='md-trash-bin' size={25}/>
</Interaction> : null}
</InteractionWrapper>  

</Card>

      );

};
export default PostCard;