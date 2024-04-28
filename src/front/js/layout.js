import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LandingPage } from "./component/landing.jsx";
import { SignupPage } from "./pages/signup.jsx";
import { LoginPage } from "./pages/login.jsx";
import { PrivateProfile } from "./pages/private.jsx";

//create your first component
export const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<SignupPage />} path="/signup" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<PrivateProfile />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};
export default injectContext(Layout);