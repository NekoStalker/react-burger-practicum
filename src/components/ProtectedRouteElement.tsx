import React,{FC} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import {IUserStore} from '../types/userTypes';
import {IProtectedUserRouteElement} from '../types/storeType'


const ProtectedRouteElement: FC<IProtectedUserRouteElement> = ({ element, forGuest , path })=> {
  const user = useSelector((store: IUserStore) => store.user.userInfo);
  const isLoading = useSelector((store: IUserStore) => store.user.isLoading);
  const error = useSelector((store: IUserStore) => store.user.error);

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading" wrapperClass="loader" />;
  }

  if (forGuest && user) {
    return <Navigate to={path} replace />;
  }

  if (!forGuest && !user) {
    return <Navigate to={path} replace />;
  }
  return <>{element}</>; 
}

export default ProtectedRouteElement;
