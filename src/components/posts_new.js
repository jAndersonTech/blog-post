import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions';
import { Link } from 'react-router';
import '../css/new_post.css';

const FIELDS = {
	title: {
		type: 'input',
		label: 'Title for post'
	},
	categories:{
		type: 'input',
		label: 'Enter some categories'
	}, 
	content:{
		type: 'textarea',
		label: 'Post Content'
	}
};

class PostsNew extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => { 

				// blog post successfully created,
				// navigate back to main page
				this.context.router.push('/home');
			});
	}

	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];

		return(
			<div key={fieldConfig.label} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
				<label>{fieldConfig.label}</label>
				<fieldConfig.type type="text" className="form-control" {...fieldHelper} />
				<div className="text-help">
					{fieldHelper.touched ? fieldHelper.error : ''}
				</div>
			</div>
		);
	}

	render() {

		const { handleSubmit } = this.props;

		document.title = "Blog Post | New Post";

		return (
			<form className="new-post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h2>Create a new post</h2>

				<div>

					{ _.map(FIELDS, this.renderField.bind(this)) }

					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/home" className="btn btn-danger button">Cancel</Link>
				</div>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if(!values[field]) {
			errors[field] = `Enter ${field}`;
		}
	});

	return errors;
}

// connect arguments (mapStateToProps, mapDispatchToProps)
// reduxForm arguments (config, mapStateToProps, mapDispatchToProps)
// user types something... records on app state
export default reduxForm({
	form: 'PostsNewForm',
	fields: _.keys(FIELDS),
	validate
}, null, {createPost})(PostsNew);