import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProductDeleteModal: false,
      showStockDeleteModal: false,
      stockId: '',
      type: '',
      productId: ''
    };
  }

  componentWillMount() {
    this.props.getProductList();
    this.props.getProductCategory();
  }

  toggleProductDeleteModal(showProductDeleteModal, productId = '') {
    this.setState({ showProductDeleteModal, productId });
  }

  toggleStockDeleteModal(showStockDeleteModal, stockId = '', type = '', productId = '') {
    this.setState({ showStockDeleteModal, stockId, type, productId });
  }

  handleDelete() {
    this.props.removeProduct(this.state.productId);
    this.setState({ showProductDeleteModal: false, productId: '' });
  }

  handleStockDelete() {
    if(this.state.type === 'purchase') {
      this.props.removeStockPurchase(this.state.stockId, this.state.productId);
    } else {
      this.props.removeStockSold(this.state.stockId, this.state.productId);
    }
    this.setState({ showStockDeleteModal: false, stockId: '', type: '', productId: '' });
  }

  renderStockDetailsTemplate(stockDetailsArr, type, productId) {
    if(stockDetailsArr.length) {
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date (mm-dd-yyyy)</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderStockDetails(stockDetailsArr, type, productId)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <p>No stock {type} data available.</p>
      );
    }
  }

  renderStockDetails(stockDetailsArr, type, productId) {
    let count = 1;
    return stockDetailsArr.map((stock) => {
      return (
        <tr key={stock._id}>
          <td>{count++}</td>
          <td>{stock.quantity}</td>
          <td>{stock.amount}</td>
          <td>{Moment(stock.date).format('MM-DD-YYYY')}</td>
          <td><Link className="edit-link" to={`/edit-${type}-stock/${productId}/${stock._id}`}>Edit</Link></td>
          <td><span className="delete-link" onClick={() => this.toggleStockDeleteModal(true, stock._id, type, productId)}>Delete</span></td>
        </tr>
      );
    });
  }

  renderProductImage(img) {
    if(img) {
      return (
        <img alt="Product pic" src={img} />
      );
    }
  }

  calculateTotalValues(stockPurchaseData, stockSoldData) {
    let totalPurchaseValue = 0;
    let totalPurchaseStock = 0;
    let totalSoldValue = 0;
    let totalSoldStock = 0;

    for(let i = 0; i < stockPurchaseData.length; i++) {
      totalPurchaseValue += parseInt(stockPurchaseData[i].amount, 10);
      totalPurchaseStock += parseInt(stockPurchaseData[i].quantity, 10);
    }

    for(let i = 0; i < stockSoldData.length; i++) {
      totalSoldValue += parseInt(stockSoldData[i].amount, 10);
      totalSoldStock += parseInt(stockSoldData[i].quantity, 10);
    }

    if(totalPurchaseValue || totalSoldValue) {
      return (
        <div className="total-stock-details">
          <p>Available stock: <span>{totalPurchaseStock - totalSoldStock}</span></p>
          <p>Purchase stock: <span>{totalPurchaseValue || 'N/A'}</span></p>
          <p>Sold stock: <span>{totalSoldValue || 'N/A'}</span></p>
          <p>Total Profit: <span>{(totalPurchaseValue && totalSoldValue) ? (totalSoldValue - totalPurchaseValue) : 'N/A'}</span></p>
        </div>
      );
    }
  }

  renderProductCardTemplate() {
    if(this.props.productData.length) {
      return this.props.productData.map((product) => {
        return (
          <div key={product._id} className="product-card">
            <div className="clearfix">
              <div className="product-info">
                <p className="product-title">{product.productName}</p>
                <p className="product-category">{product.productCategory}</p>
                <p className="product-description">{product.productDescription}</p>
                {this.calculateTotalValues(product.stockPurchase, product.stockSold)}
                <div className="product-stock-links">
                  <Link className="edit-link" to={`/add-purchase-stock/${product._id}`}>Add Purchase Stock</Link>
                  <Link className="edit-link" to={`/add-sold-stock/${product._id}`}>Add Sold Stock</Link>
                </div>
              </div>
              <div className="product-update-links">
                <Link className="edit-link" to={`/edit-product/${product._id}`}>Edit</Link>
                <span className="delete-link" onClick={() => this.toggleProductDeleteModal(true, product._id)}>Delete</span>
              </div>
            </div>

            <div className="purchase-sold-details">

              <div className="purchase-details">
                <h3>Purchase Details</h3>
                {this.renderStockDetailsTemplate(product.stockPurchase, 'purchase', product._id)}
              </div>

              <div className="sold-details">
                <h3>Sold Details</h3>
                {this.renderStockDetailsTemplate(product.stockSold, 'sold', product._id)}
              </div>

            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="no-product-wrapper">
          <p>No Products added.</p>
        </div>
      );
    }
  }

  renderProductCategoryList() {
    if(!!this.props.productCategory && this.props.productCategory.length) {
      return this.props.productCategory.map((category) => {
        return (
          <option key={category.value} value={category.label}>{category.label}</option>
        );
      });
    }
  }

  handleCategoryChange(event) {
    const selectedProductCategory = event.target.value;
    this.props.getProductByCategory(selectedProductCategory);
  }

  renderSelectCategory() {
    return(
      <select 
        onChange={(e) => this.handleCategoryChange(e)}>
        <option>All</option>
        {this.renderProductCategoryList()}
      </select>
    );
  }

  render() {

    return (
      <div className="wrapper product-card-list clearfix">
        <h2 className="main-title">
          Products
        </h2>
        <div className="clearfix">
          <p className="category-filter">Category: {this.renderSelectCategory()}</p>
          <Link to="/create-product" className="create-product-btn">Create Product</Link>
        </div>
        {this.renderProductCardTemplate()}

        <div className={this.state.showProductDeleteModal ? 'show-product-modal' : ''} >
          <div className="modal-message">
            <p>Are you sure you want to delete product?</p>
            <div className="modal-btn-wrapper">
              <span onClick={() => this.toggleProductDeleteModal(false)}>No</span>
              <span onClick={() => this.handleDelete()}>Yes</span>
            </div>
          </div>
          <div className="modal-overlay" onClick={() => this.toggleProductDeleteModal(false)}></div>
        </div>

        <div className={this.state.showStockDeleteModal ? 'show-stock-modal' : ''} >
          <div className="modal-message">
            <p>Are you sure you want to delete stock?</p>
            <div className="modal-btn-wrapper">
              <span onClick={() => this.toggleStockDeleteModal(false)}>No</span>
              <span onClick={() => this.handleStockDelete()}>Yes</span>
            </div>
          </div>
          <div className="modal-overlay" onClick={() => this.toggleStockDeleteModal(false)}></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.product.all,
  productCategory: state.product.productCategory
});

export default connect(
  mapStateToProps,
  actions
)(ProductList);
