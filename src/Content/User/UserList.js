import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../_actions';
import defaultProfileImage from '../../assets/images/default-profile-image.png';

class UserList extends Component {
	componentWillMount() {
		this.props.getUserList();
  }

  handleStatusChange(userId, statusType) {
    this.props.updateUser(userId, {
	    status: statusType
	  });
  }

  handleRoleChange(event) {
    const userId = event.target.getAttribute("data-user-id");
    const selectedRole = event.target.value;
  	this.props.updateUser(userId, {
	    role: selectedRole
	  });
  }

  renderStatusButton(status, userId) {
    if(status === 'active') {
      return <span className="delete-link" onClick={() => this.handleStatusChange(userId, 'inactive')}>Delete</span>;
    } else {
      return <span className="delete-link" onClick={() => this.handleStatusChange(userId, 'active')}>Activate</span>;
    }
  }

  renderProfilePicture(avatar) {
    if(avatar) {
      return (
        <img alt="Profile" src={avatar} width="50" height="50" />
      );
    } else {
      return (
        <img alt="Profile" src={defaultProfileImage} width="50" height="50" />
      );
    }
  }

  renderSelectRole(role, userId) {
    return(
      <select 
        data-user-id={userId} 
        defaultValue={role} 
        onChange={(e) => this.handleRoleChange(e)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    );
  }

  renderUsers() {
    return this.props.userData.map((user) => {
      return (
        <tr key={user._id}>
          <td>{this.renderProfilePicture(user.avatar)}</td>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>
            {this.renderSelectRole(user.role, user._id)}
          </td>
          <td className="status-text">{user.status}</td>
          <td>{this.renderStatusButton(user.status, user._id)}</td>
        </tr>
      );
    });
  }

  renderUserListTemplate() {
  	if(this.props.userData.length) {
	  	return(
        <div className="table-responsive">
  	  		<table className="table table-striped">
  	        <thead>
  	          <tr>
  	            <th></th>
  	            <th>Name</th>
  	            <th>Phone</th>
  	            <th>Email</th>
  	            <th>Role</th>
  	            <th>Status</th>
  	            <th>Delete</th>
  	          </tr>
  	        </thead>
  	        <tbody>
  	          {this.renderUsers()}
  	        </tbody>
  	      </table>
        </div>
	  	);
    } else {
    	return (
    		<p>No User Found.</p>
    	);
    }
  }

  render() {

		return (
      <div className="admin-dashboard-wrapper wrapper">
  			<div className="user-list">
          <p className="main-title">
            User List
          </p>
          {this.renderUserListTemplate()}
        </div>
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.all
});

export default connect(
  mapStateToProps,
  actions
)(UserList);