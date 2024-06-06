import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { RootState } from '../store';

type TProtectedRouteProps = RouteProps & {
  forGuest?: boolean;
  children?: React.ReactNode | JSX.Element;
};

const ProtectedRouteElement: FC<TProtectedRouteProps> = ({
  children,
  forGuest = false,
  ...rest
}) => {
  const user = useSelector((store: RootState) => store.user.userInfo);
  const isLoading = useSelector((store: RootState) => store.user.isLoading);
  const error = useSelector((store: RootState) => store.user.error);
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
