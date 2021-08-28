import React from 'react';
import {ImageBackground,Text,View,StyleSheet} from 'react-native';
import {Container, Card,UserInfo,UserImg,UserInfoText,PostTime,UserName,InteractionWrapper,Interaction,InteractionText, PostText, PostImg,Divider} from '../styles/FeedStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostCard=({item})=>{
console.log(item['item'].userName);
console.log(item['item'].postImg);
console.log(item['item'].postImg=="none");

likeIcon=item['item'].liked ? 'heart' : 'heart-outline';
likeIconColor=item['item'].liked ? '#2e64e5' : '#333';

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
   <UserImg source={item['item'].userImg}/>
   <UserInfoText>
        <UserName>{item['item'].userName}</UserName>
        <PostTime>{item['item'].postTime}</PostTime>
    </UserInfoText>
</UserInfo>

<PostText>{item['item'].postText}</PostText>
{item['item'].postImg=="none" ? <Divider/> : <PostImg source={item['item'].postImg} /> }
{/*<PostImg source={userImg}/>*/}
<InteractionWrapper>
<Interaction active={item['item'].liked}>
<Ionicons name={likeIcon} size={25} color={likeIconColor}/>
<InteractionText active={item['item'].liked}>{item['item'].likes}</InteractionText>
</Interaction>
<Interaction>
<Ionicons name='md-chatbubble-outline' size={25}/>
<InteractionText>{item['item'].comments}</InteractionText>
</Interaction>
</InteractionWrapper>

</Card>

      );

};
export default PostCard;