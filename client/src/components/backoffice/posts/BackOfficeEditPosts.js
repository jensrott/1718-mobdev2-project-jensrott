import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/* Components */
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

/* Actions */
import { getPosts, editPost } from '../../../actions/postActions';

/* Helper functions */
import isEmpty from '../../../validation/is-empty';

class BackOfficeEditPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: '',
      avatar: '',
      user: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this); Doesn't work yet
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps);
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post.posts[0]) {
      const post = nextProps.post.posts[0];

      this.setState({
        text: post.text,
        user: post.user
      });
    }
  }

  onSubmit(e, id) {
    e.preventDefault();
    const newPost = {
      text: this.state.text,
      user: this.state.user
    };
    this.onClickEditPost(newPost, id);

    // this.props.editPost(newPost, id);
  }

  onClickEditPost(postData, id) {
    this.props.editPost(postData, id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { posts } = this.props.post;
    const { errors } = this.state;
    console.log(posts);
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/backoffice/posts" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit.bind(this, posts._id)}>
                <TextFieldGroup
                  placeholder="* Text Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Text from the post"
                />
                <TextFieldGroup
                  placeholder="User"
                  name="user"
                  value={this.state.user}
                  onChange={this.onChange}
                  error={errors.group}
                  info="The user who wrote the post"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BackOfficeEditPosts.propTypes = {
  editPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPosts, editPost }
)(withRouter(BackOfficeEditPosts));
