import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';

/* Recompose */
import compose from 'recompose/compose';

/* Material UI */
import Button from '@material-ui/core/Button';
import IconCreate from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* Components */
import BackOfficeActions from '../BackOfficeActions'; // Header

/* Actions */
import {
  softDeletePost,
  getPosts,
  deletePost
} from '../../../actions/postActions'; // Edit post todo

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 300
  },
  button: {
    margin: theme.spacing.unit,
    width: '40px',
    height: '40px'
  }
});

class BackOfficeUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPosts(); // Through redux
  }

  softDeletePostOnClick(id) {
    this.props.softDeletePost(id);
    console.log(`Softdelete post with ${id}`);
  }

  hardDeletePostOnClick(id) {
    this.props.deletePost(id);
    console.log(`HardDeleted post with ${id}`);
  }

  editPostOnClick(id) {
    // this.props.editPost(id);
    console.log(`Edited post with ${id}`);
  }

  GeneratePostsData() {
    const { posts, loading } = this.props.post;
    const { classes } = this.props;

    return posts.map((post, index) => (
      <TableRow key={post._id}>
        <TableCell>{post.text}</TableCell>
        <TableCell>{post.name}</TableCell>
        <TableCell>
          <img
            style={{ width: '50px', height: 'auto' }}
            width="50px"
            height="auto"
            className="rounded-circle"
            src={post.avatar}
            alt="user-avatar"
          />
        </TableCell>
        <TableCell>{post.likes.length}</TableCell>
        <TableCell>{post.comments.length}</TableCell>
        <TableCell>
          <Button
            variant="fab"
            color="secondary"
            aria-label="edit"
            className={classes.button}
            onClick={this.softDeletePostOnClick.bind(this, post._id)}
          >
            <IconCreate />
          </Button>
          <Button
            variant="fab"
            color="secondary"
            aria-label="edit"
            className={classes.button}
            onClick={this.hardDeletePostOnClick.bind(this, post._id)}
          >
            <IconCreate />
          </Button>
          <Button
            variant="fab"
            color="secondary"
            aria-label="edit"
            className={classes.button}
            onClick={this.editPostOnClick.bind(this, post._id)}
          >
            <IconCreate />
          </Button>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className="lead-title">Backoffice</h1>
        <BackOfficeActions />
        <h2 className="lead-text">Users</h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>User</TableCell>
                <TableCell>User avatar</TableCell>
                <TableCell>Total likes</TableCell>
                <TableCell>Total Comments</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.GeneratePostsData()}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

BackOfficeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
  softDeletePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default compose(
  // With the library recompse we can use multiple higher order components in an easier way
  withStyles(styles),
  connect(mapStateToProps, { getPosts, softDeletePost, deletePost })
)(BackOfficeUsers);