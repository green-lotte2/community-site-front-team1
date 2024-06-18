// src/router/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 라우터에 적용하여 로그인 여부와 권한 확인해서 접근 제한하는 함수

const PrivateRoute = ({ allowedRoles, children  }) => {
  const { accessToken, userRole }  = useSelector((state) => state.loginSlice);

  if (!accessToken) {
    alert("로그인 후 이용 가능합니다.");
    return <Navigate to="/login" />;
  }

  //alert(userRole);
  

  if (!allowedRoles.includes(userRole)) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
