import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner'; 

import PropTypes from 'prop-types';


function ProtectedRoutePassword({ element}) {
  const dispatch = useDispatch();
  const emailSubmitted = useSelector((state) => state.user.emailSubmitted); 
  const user = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.isLoading);

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading"  wrapperClass="loader" />;
  }

  if ( !emailSubmitted) {
    return <Navigate to="/forgot-password" replace />;
  }
 
  return element; 
}
ProtectedRoutePassword.propTypes = {
  element: PropTypes.element.isRequired, 
};
export default ProtectedRoutePassword;
