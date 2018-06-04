import React from 'react';
import { Link } from 'react-router-dom';

const BackOfficeActions = () => {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to="/backoffice/posts" className="btn btn-light">
          <i className="fas fa-address-book mr-1" />
          Posts
        </Link>
        <Link to="/backoffice/users" className="btn btn-light">
          <i className="fas fa-user-circle mr-1" /> 
          Users
        </Link>
        <Link to="/backoffice/grouprides" className="btn btn-light">
          <i className="fas fa-users mr-1" />
          Group Rides
        </Link>
      </div>
    </div>
  );
};

export default BackOfficeActions;
