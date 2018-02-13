import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../_actions';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCategoryDeleteModal: false,
      categoryId: ''
    };
  }

	componentWillMount() {
		this.props.getCategoryList();
  }

  toggleCategoryDeleteModal(showCategoryDeleteModal, categoryId = '') {
    this.setState({ showCategoryDeleteModal, categoryId });
  }

  handleDelete() {
    this.props.removeCategory(this.state.categoryId);
    this.setState({ showCategoryDeleteModal: false, categoryId: '' });
  }

  renderCategories() {
    let categoryCount = 1;
    return this.props.categoryData.map((category) => {
      return (
        <tr key={category._id}>
          <td>{categoryCount++}</td>
          <td>{category.name}</td>
          <td><Link className="edit-link" to={`/edit-category/${category._id}`}>Edit</Link></td>
          <td><span className="delete-link" onClick={() => this.toggleCategoryDeleteModal(true, category._id)}>Delete</span></td>
        </tr>
      );
    });
  }

  renderCategoryListTemplate() {
  	if(this.props.categoryData.length) {
	  	return(
        <div className="table-responsive">
  	  		<table className="table table-striped">
  	        <thead>
  	          <tr>
  	            <th>#</th>
  	            <th>Category Name</th>
  	            <th>Edit</th>
  	            <th>Delete</th>
  	          </tr>
  	        </thead>
  	        <tbody>
  	          {this.renderCategories()}
  	        </tbody>
  	      </table>
        </div>
	  	);
    } else {
    	return (
    		<p>No Category Added.</p>
    	);
    }
  }

  render() {

		return (
      <div className="admin-dashboard-wrapper wrapper">
  			<div className="category-list">
          <p className="main-title">
            Category List
          </p>
          <div className="clearfix">
  			    <Link to="/create-category" className="create-category-btn">Create Category</Link>
          </div>
          {this.renderCategoryListTemplate()}

          <div className={this.state.showCategoryDeleteModal ? 'show-category-modal' : ''} >
            <div className="modal-message">
              <p>Are you sure you want to delete category?</p>
              <div className="modal-btn-wrapper">
                <span onClick={() => this.toggleCategoryDeleteModal(false)}>No</span>
                <span onClick={() => this.handleDelete()}>Yes</span>
              </div>
            </div>
            <div className="modal-overlay" onClick={() => this.toggleCategoryDeleteModal(false)}></div>
          </div>

        </div>
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  categoryData: state.category.all
});

export default connect(
  mapStateToProps,
  actions
)(CategoryList);
