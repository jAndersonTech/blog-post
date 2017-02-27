import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LoginForm from './components/login_form'
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// google.com/ where / is the path => renders App
export default ( 
	<Route path="/" component={App}>
		<IndexRoute component={LoginForm} />
		<Route path="home" component={PostsIndex} />
		<Route path="posts/new" component={PostsNew} />
		<Route path="posts/:id" component={PostsShow} />
	</Route> 
);



