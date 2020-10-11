import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout: React.FunctionComponent = ({children}) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Layout
