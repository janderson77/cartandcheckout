import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister'
import NoPage from "./components/NoPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;