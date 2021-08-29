 import React from 'react';
import styled from 'styled-components';
//import styled from 'styled-components/native';

export const Container=styled.View`
flex:1;
justify-content:center;
align-items:center;
background-color:#fff;
padding:20px;
`; 

export const Card= styled.View`
background-color:#f8f8f8;
width:100%;
margin-bottom:20px;
border-radius:10px;
`;

export const UserInfo=styled.View`
display:flex;
flex-direction:row;
justify-content:flex-start;
padding:15px;
`;


export const UserImg=styled.Image`
width:50px;
height:50px;
border-radius:25px;
`;

export const UserName = styled.Text`
font-size:14px;
font-weight:bold;
color:black;
`;
export const PostText = styled.Text`
font-size:14px;
color:black;
padding-left:15px;
padding-right:15px;

`;

export const UserInfoText = styled.View`
display:flex;
flex-direction:column;
justify-content:center;
margin-left:10px;
`;

export const PostTime = styled.Text`
font-size:12px;
color:black;
`;

export const PostImg = styled.Image`
width:100%;
height:250px;
margin-top:15px;
`;

export const Divider=styled.View`
border-bottom-color:#333;
border-bottom-width:1px;
width:92%;
align-self:center;
margin-top:15px;
`;
export const InteractionWrapper = styled.ImageBackground`
flex-direction:row;
justify-content:space-around;
padding:15px;
`;
export const Interaction = styled.TouchableOpacity`
flex-direction:row;
justify-content:center;
border-radius:5px;
padding:2px 5px;
`;

export const InteractionText = styled.Text`
font-size:12px;
font-weight:bold;
color:${props=>props.active ? '#2e64e5' : '#333'};
margin-top:5px;
margin-left:5px;
`;

