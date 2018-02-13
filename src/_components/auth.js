import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest, authenticated, admin}) => {

	return (<Route
    {...rest}
    render={(props) => (authenticated === 'true' && admin !== 'false')
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />)
}