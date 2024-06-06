import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { IUserStore } from '../services/types/userTypes';
import {IProtectedRouteElement} from '../services/types/storeType'
import { RootState, useAppSelector } from '../store';


const ProtectedRoutePassword: FC<IProtectedRouteElement> = ({ children }) => {
  const emailSubmitted = useAppSelector((store: RootState) => store.user.emailSubmitted);
  const user = useAppSelector((store: RootState) => store.user.userInfo);
  const isLoading = useAppSelector((store: RootState) => store.user.isLoading);

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading" wrapperClass="loader" />;
  }

  if (!emailSubmitted) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutePassword;
