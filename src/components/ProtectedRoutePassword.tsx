import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { IUserStore } from '../types/userTypes';
import {IProtectedRouteElement} from '../types/storeType'

const ProtectedRoutePassword: FC<IProtectedRouteElement> = ({ element }) => {
  const emailSubmitted = useSelector((store: IUserStore) => store.user.emailSubmitted);
  const user = useSelector((store: IUserStore) => store.user.userInfo);
  const isLoading = useSelector((store: IUserStore) => store.user.isLoading);

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading" wrapperClass="loader" />;
  }

  if (!emailSubmitted) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>; 
};

export default ProtectedRoutePassword;
