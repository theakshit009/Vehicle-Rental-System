import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useBranchStore from '../../store/branch.store';

/**
 * BranchRoute - Protected route for branch portal
 * Checks if user has branch access before allowing route access
 */
const BranchRoute = ({ children }) => {
    const { user, userRole } = useBranchStore();

    // Check if user has branch access (simplified - in production, check auth token)
    const hasAccess = user && (userRole === 'manager' || userRole === 'staff');

    if (!hasAccess) {
        // Redirect to branch login if not authenticated
        return <Navigate to="/branch/login" replace />;
    }

    return children;
};

BranchRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BranchRoute;
