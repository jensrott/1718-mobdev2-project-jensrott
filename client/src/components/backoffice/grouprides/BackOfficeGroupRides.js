import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';

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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';

/* Components */
import BackOfficeActions from '../BackOfficeActions'; // Header

/* Actions */
import {
  // softDeletePost,
  getCurrentProfile,
  deleteGroupRide
} from '../../../actions/profileActions';

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

class BackOfficeGroupRides extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentProfile(); // Through redux
  }

  softDeleteGroupRideOnClick(id) {
    // TODO
    console.log('softdelete')
  }

  hardDeleteGroupRideOnClick(id) {
    this.props.deleteGroupRide(id);
    console.log(`HardDeleted post with ${id}`);
  }

  editGroupRideOnClick(id) {
    console.log('edit');
  }

  GenerateGroupRidesData() {
    const { groupride } = this.props.profile.profile;
    const { classes } = this.props;
    console.log(this.props.profile.profile);

    return groupride.map(grp => (
      <TableRow key={grp._id}>
        <TableCell>{grp.name}</TableCell>
        <TableCell>{grp.location}</TableCell>

        <TableCell>
          <IconButton
            variant="fab"
            color="secondary"
            aria-label="edit"
            className={classes.button}
            onClick={this.editGroupRideOnClick.bind(this, grp._id)}
          >
            <Link to="/backoffice/grouprides/edit" className="btn btn-light">
              <IconCreate />
            </Link>
          </IconButton>
          <IconButton
            className={classes.button}
            aria-label="Delete"
            onClick={this.softDeleteGroupRideOnClick.bind(this, grp._id)}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            className={classes.button}
            aria-label="Delete"
            onClick={this.hardDeleteGroupRideOnClick.bind(this, grp._id)}
          >
            <IconDeleteForever />
          </IconButton>
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
        <h2 className="lead-text">Group Rides</h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.GenerateGroupRidesData()}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

BackOfficeGroupRides.propTypes = {
  classes: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteGroupRide: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  // With the library recompse we can use multiple higher order components in an easier way
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCurrentProfile, deleteGroupRide }
  )
)(BackOfficeGroupRides);
