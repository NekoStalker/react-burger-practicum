import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { getUser } from '../services/user/userRequests'; 
import PropTypes from 'prop-types';

function ProtectedRouteElement({ element, forGuest , path }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading" wrapperClass="loader" />;
  }

  if (forGuest && user) {
    return <Navigate to={path} replace />;
  }

  if (!forGuest && !user) {
    return <Navigate to={path} replace />;
  }
  return element;
}
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired, 
  forGuest: PropTypes.bool.isRequired, 
  path: PropTypes.string.isRequired, 
}
export default ProtectedRouteElement;
