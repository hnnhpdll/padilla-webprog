import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("type");

    console.log("TOKEN:", token);
    console.log("ROLE:", role);

    // ❌ Not logged in
    if (!token) {
        return <Navigate to="/auth/signin" />;
    }

    // ❌ Role missing or not allowed
    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/auth/signin" />;
    }

    // ✅ Allowed access
    return children;
}

export default ProtectedRoute;