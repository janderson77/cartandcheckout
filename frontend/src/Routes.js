import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister'
import NoPage from "./components/NoPage";
import UserPage from "./components/UserPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/users/:userid" element={<UserPage />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;