import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Measurement from "../Container/Pages/Measurement";
import Drafting from "../Container/Pages/Drafting";
import Apartments from "../Container/Pages/Apartments";
import Construction from "../Container/Pages/Construction";
import House from "../Container/Pages/House";
import Error from "../Error";
import Login from "../Admin/Login";
import MainLayout from "../layouts/MainLayout";
import Create from '../Admin/Create'
import Edit from '../Admin/Edit'
import List from '../Admin/List'

import {AuthProvider, useAuth} from "../Admin/AuthContext";

const PrivateRoute = ({element, ...rest}) => {
    const {user} = useAuth();
    return user ? element : <Navigate to="/login"/>;
};

const Routing = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Measurement/>}/>
                    <Route path="/drafting" element={<Drafting/>}/>
                    <Route path="/apartments" element={<Apartments/>}/>
                    <Route path="/construction" element={<Construction/>}/>
                    <Route path="/house/:id" element={<House/>}/>
                </Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/list' element={<PrivateRoute element={<List/>}/>}/>
                <Route path='/create' element={<PrivateRoute element={<Create/>}/>}/>
                <Route path='/edit/:id' element={<PrivateRoute element={<Edit/>}/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </AuthProvider>
    );
};

export default Routing;
