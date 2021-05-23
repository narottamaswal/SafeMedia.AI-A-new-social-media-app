import React,{ createContext,useState} from 'react';
import * as firebase from 'firebase';
export const AuthContext = createContext();
import {firebaseConfig } from './FirebaseApi';
export const AuthProvider = ({children})=>{
if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
console.log("database app connected");
	}
console.log("Auth providerr");
	const [user,setUser] = useState(null);
	return(
		<AuthContext.Provider value={{user,setUser,
			login:async(email,password)=>{
				try{
					alert(email+''+password);
				}catch(err){
					console.log(err.message);
				}

		},     
	register: async (email, password) => {
        	console.log(email+''+password); 
	},
 logout: async () => {
          console.log("hi");
        },
      }}>
      {children}
    </AuthContext.Provider>
	);
}