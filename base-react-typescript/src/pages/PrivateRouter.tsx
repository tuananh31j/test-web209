import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '~/context/Auth';

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
    const { token } = useContext(AuthContext);
    if (!token) return <Navigate to={'/login'}></Navigate>;

    return <>{children}</>;
};

export default PrivateRouter;
