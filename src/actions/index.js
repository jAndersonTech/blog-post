import firebase from 'firebase';

const TITLE = "Welcome to Blog Post - Click Here";
const CATEGORIES = "introduction, tutorial";
const CONTENT = "Hello and welcome. Currently you are viewing " +
				"your very first blog post. Click the buttons " +
				"above to go back or delete this post. Then in " +
				"the main screen, click the button near the top " +
				"to create your first post. Happy blogging."

// Blog CRD (create, read, delete) post actions 
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_SELECTED_POST = "FETCH_SELECTED_POST";
export const CREATE_POST = "CREATE_POST";
export const CREATE_FIRST_POST = "CREATE_FIRST_POST";
export const DELETE_POST = "DELETE_POST";

export function fetchPosts() {

	const { uid } = firebase.auth().currentUser;
	const ref = firebase.database().ref(`users/${uid}/posts`);

	return ref.once('value').then( snapshot => {

		return {
			type: FETCH_POSTS,
			payload: snapshot.val()
		};
	});

}

export function fetchSelectedPost(id) {

	const { uid } = firebase.auth().currentUser;
	const ref = firebase.database().ref(`users/${uid}/posts/${id}`);

	return ref.once('value').then( snapshot => {
		return{
			type: FETCH_SELECTED_POST,
			payload: snapshot.val()
		};
	})

	
}

export function createPost({title, categories, content}) {

	const { currentUser } = firebase.auth();
	const ref = firebase.database().ref(`users/${currentUser.uid}/posts`);
	const date = new Date();

	const request = ref.push({title, categories, content, date: date.toDateString()});

	return {
		type: CREATE_POST,
		payload: request
	};
}

export function deletePost(id) {

	const { currentUser } = firebase.auth();
	const ref = firebase.database().ref(`users/${currentUser.uid}/posts/${id}`);

	const request = ref.remove();

	return {
		type: DELETE_POST,
		payload: request
	};
}

export function createFirstPost() {

	const { currentUser } = firebase.auth();
	const ref = firebase.database().ref(`users/${currentUser.uid}/posts`);

	const date = new Date();

	const request = ref.push({title: TITLE, categories: CATEGORIES, content: CONTENT, date: date.toDateString() });

		return {
		type: CREATE_FIRST_POST,
		payload: request
	};
}


// firebase authentication actions
export const LOGIN_USER = "LOGIN_USER";

export function loginUser({email, password}) {

	const auth = firebase.auth().signInWithEmailAndPassword(email,password)
		.catch((error) => { 
			if(error.code === "auth/user-not-found") {
				const confirmed = confirm("Would you like to create an account with these fields?");

				if(confirmed) {
					createAccount(email, password);
				}
			} else {
				alert("Bad email/password. Try Again."); 
			}
		});

	return {
		type: LOGIN_USER,
		payload: auth ? auth : ""
	};
}

function createAccount(email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
		console.log("Value should be entered for password");
	});
}