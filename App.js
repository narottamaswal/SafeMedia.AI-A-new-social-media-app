import React from 'react';
import Providers from './navigation/index';
import * as firebase from 'firebase';
import {firebaseConfig } from './FirebaseApi';
const App = () => {
	if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
console.log("database connected");
	}
console.log("App");
  return <Providers />;
}

export default App;
 