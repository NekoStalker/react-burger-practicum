import React, { FC } from 'react';

import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import {  useAppSelector } from '../store';

type TProtectedRouteProps = RouteProps & {
  forGuest?: boolean;
  children?: React.ReactNode | JSX.Element;
};

const ProtectedRouteElement: FC<TProtectedRouteProps> = ({
  children,
  forGuest = false,
  ...rest
}) => {
  const user = useAppSelector((store) => store.user.userInfo);
  const isLoading = useAppSelector((store) => store.user.isLoading);
  const error = useAppSelector((store) => store.user.error);
  const location = useLocation();

  if (isLoading) {
    return <Puff height="180" width="180" color="blue" ariaLabel="puff-loading" wrapperClass="loader" />;
  }


  if (!forGuest && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (forGuest && user) {
    const { from } = (location.state as { from?: Location }) || { from: { pathname: '/' } };
    if (from)
    return <Navigate to={from.pathname} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
