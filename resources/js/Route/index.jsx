import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';
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
import {useTranslation} from "react-i18next";


const PrivateRoute = ({element, ...rest}) => {
    const {user} = useAuth();
    return user ? element : <Navigate to="/login"/>;
};

const Routing = () => {
        const {t, i18n, ready} = useTranslation();

        return (<HelmetProvider>
                <AuthProvider>
                    <Routes>
                        <Route element={<MainLayout/>}>
                            <Route path="/" element={<>
                                <Helmet>
                                    <title>{t("routings.measurement")}</title>
                                </Helmet>
                                <Measurement/>
                            </>}/>

                            <Route path="/drafting" element={<>
                                <Helmet>
                                    <title>{t("routings.drafting")}</title>
                                </Helmet>
                                <Drafting/>
                            </>}/>

                            <Route path="/apartments" element={<>
                                <Helmet>
                                    <title>{t("routings.apartments")}</title>
                                </Helmet>
                                <Apartments/>
                            </>}/>

                            <Route path="/construction" element={<>
                                <Helmet>
                                    <title>{t("routings.construction")}</title>
                                </Helmet>
                                <Construction/>
                            </>}/>

                            <Route path="/house/:id" element={<>
                                <Helmet>
                                    <title>{t("routings.house")}</title>
                                </Helmet>
                                <House/>
                            </>}/>

                        </Route>
                        <Route path='/login' element={<>
                            <Helmet>
                                <title>{t("routings.login")}</title>
                            </Helmet>
                            <Login/>
                        </>}/>

                        <Route path='/list' element={<PrivateRoute element={<>
                            <Helmet>
                                <title>{t("routings.list")}</title>
                            </Helmet>
                            <List/>
                        </>}/>}/>

                        <Route path='/create' element={<PrivateRoute element={<>
                            <Helmet>
                                <title>{t("routings.create")}</title>
                            </Helmet>
                            <Create/>
                        </>}/>}/>

                        <Route path='/edit/:id' element={<PrivateRoute element={<>
                            <Helmet>
                                <title>{t("routings.edit")}</title>
                            </Helmet>
                            <Edit/>
                        </>}/>}/>

                        <Route path="*" element={<>
                            <Helmet>
                                <title>{t("routings.error")}-404</title>
                            </Helmet>
                            <Error/>
                        </>}/>

                    </Routes>
                </AuthProvider>
            </HelmetProvider>

        );
    }
;

export default Routing;
