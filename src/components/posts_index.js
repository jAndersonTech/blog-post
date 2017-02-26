import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, createFirstPost } from '../actions';
import { Link } from 'react-router';

class PostsIndex extends Component {

	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {

		return this.props.posts.map((post) => {

			return (
				<Link to={"posts/" + post.uid} key={post.uid}>
					<li className="list-group-item">
						<span className="pull-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</li>
				</Link>
			);
		})
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.posts.length) {
			this.props.createFirstPost();
		}
	}

	render() {

		return (
			<div>
				<div className="text-right">
					<Link to="/posts/new" className="btn btn-primary">
						Create a Post
					</Link>
				</div>
				<h2>Posts</h2>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {

	const posts = _.map(state.posts.all, (val, uid) => {
		return { ...val, uid};
	});

	return { posts };
};

export default connect(mapStateToProps, { fetchPosts, createFirstPost })(PostsIndex);