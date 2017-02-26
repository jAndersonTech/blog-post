import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSelectedPost, deletePost } from '../actions';
import '../css/show_post.css';

class PostsShow extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchSelectedPost(this.props.params.id);
	}

	onDeleteClick() {

		this.props.deletePost(this.props.params.id).then(() => { 

				// blog post successfully deleted,
				// navigate back to main page
				this.context.router.push('/home');
			});
		
	}

	render() {
	
		const { post } = this.props;

		document.title = "Blog Post | Post";

		if(!post) {
			return <div>Loading...</div>
		}

		return (
			<div className="show-post">
				<Link to="/home" className="btn btn-primary">Back to index</Link>
				<button 
					className="btn btn-danger pull-right" 
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
				<section>
					<h3>{post.title}</h3>
					<h6><strong>Date Created:</strong> {post.date}<br />
						<strong>Categories:</strong> {post.categories}</h6>
					<hr />
					<p>{post.content}</p>
				</section>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchSelectedPost, deletePost })(PostsShow);