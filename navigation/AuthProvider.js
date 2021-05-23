import React,{ createContext,useState} from 'react';
import * as firebase from 'firebase';
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

console.log("Auth providerr");
	const [user,setUser] = useState(null);
	return(
		<AuthContext.Provider value={{user,setUser,
			login:async(email,password)=>{
				try{
				firebase.auth().signInWithEmailAndPassword(email,password)
				.then(()=>{
					console.log("logged in");
				})
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