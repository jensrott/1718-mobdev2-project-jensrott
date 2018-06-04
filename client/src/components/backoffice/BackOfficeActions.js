import React from 'react';
import { Link } from 'react-router-dom';

const BackOfficeActions = () => {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to="/backoffice/posts" className="btn btn-light">
          <i className="fab fa-clipboard text-info mr-1" />
          Posts
        </Link>
        <Link to="/backoffice/users" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> 
          Users
        </Link>
        <Link to="/backoffice/grouprides" className="btn btn-light">
          <i className="fas fa-users text-info mr-1" />
          Group Rides
        </Link>
      </div>
    </div>
  );
};

export default BackOfficeActions;
