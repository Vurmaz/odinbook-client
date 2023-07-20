import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../api";

export default function UnAuthRoute({ children }) {
    
    if(getCookie('ah')){
        return <Navigate to='/timeline'/>
    }
    return children
}