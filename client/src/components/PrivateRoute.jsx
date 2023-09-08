import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Tenant from './Tenant';
import { useToast } from '@chakra-ui/react';

const PrivateRoute = () => {
  const toast = useToast();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      toast({
        description:'please login or book with us first',
        status:'warning',
        position:'top',
        duration:5000
      })
    }
  }, [userInfo]);
  return userInfo ? <Tenant /> : <Navigate to={'/login'} replace />;
};
export default PrivateRoute;
