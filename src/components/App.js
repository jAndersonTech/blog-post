import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component {

	componentWillMount() {

		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyC0Wp3pDFmfYIYdWFsZ_t_1gx2J3VJUhW8",
			authDomain: "blog-post-27b86.firebaseapp.com",
			databaseURL: "https://blog-post-27b86.firebaseio.com",
			storageBucket: "blog-post-27b86.appspot.com",
			messagingSenderId: "63978791442"
		};
		firebase.initializeApp(config);
	}

 	render() {
   		return (
     		<div className="app">
        		{this.props.children}
     		 </div>
    	);
  	}
}

export default App;
