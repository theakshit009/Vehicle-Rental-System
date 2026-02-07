import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useEmployeeStore from '../../store/employee.store';

const EmployeeRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, role } = useEmployeeStore();

    if (!isAuthenticated) {
        // Redirect to employee login if not authenticated
        return <Navigate to="/employee/login" replace />;
    }

    // If roles are specified, check if current role is allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect to unauthorized page
        return <Navigate to="/employee/unauthorized" replace />;
    }

    return children;
};

EmployeeRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default EmployeeRoute;
