import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {PrivateRoute} from './_components';

import Home from './Content/Home/Home';
import Login from './Authenticate/Login';
import Logout from './Authenticate/Logout';
import ForgotPassword from './Authenticate/ForgotPassword';
import ResetPassword from './Authenticate/ResetPassword';
import UserList from './Content/User/UserList';
import UserForm from './Content/User/UserForm';
import CategoryList from './Content/Category/CategoryList';
import CategoryForm from './Content/Category/CategoryForm';
import ProductForm from './Content/Product/ProductForm';
import StockPurchaseForm from './Content/Stock/StockPurchaseForm';
import StockSoldForm from './Content/Stock/StockSoldForm';

class Routes extends Component {
  isAuthenticated() {
    return (this.props.authenticated) ? 'true' : 'false';
  }

  isAdmin() {
    return (this.props.admin) ? 'true' : 'false';
  }

  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/register' component={UserForm}/>
        <Route path='/forgot-password' component={ForgotPassword}/>
        <Route path='/reset-password/:otp/:userId' component={ResetPassword}/>

        <PrivateRoute exact path='/' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={Home}/>
        <PrivateRoute path='/edit-user/:userId' authenticated={this.isAuthenticated()} component={UserForm}/>
        <PrivateRoute path='/users' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={UserList}/>
        <PrivateRoute path='/create-category' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryForm}/>
        <PrivateRoute path='/edit-category/:categoryId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryForm}/>
        <PrivateRoute path='/categories' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryList}/>
        <PrivateRoute path='/create-product' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={ProductForm}/>
        <PrivateRoute path='/edit-product/:productId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={ProductForm}/>
        <PrivateRoute path='/add-purchase-stock/:productId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={StockPurchaseForm}/>
        <PrivateRoute path='/edit-purchase-stock/:productId/:purchaseId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={StockPurchaseForm}/>
        <PrivateRoute path='/add-sold-stock/:productId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={StockSoldForm}/>
        <PrivateRoute path='/edit-sold-stock/:productId/:soldId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={StockSoldForm}/>

        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.authentication.isAuthenticated,
  admin: state.authentication.isAdmin
});

export default Routes = withRouter(connect(
  mapStateToProps
)(Routes));