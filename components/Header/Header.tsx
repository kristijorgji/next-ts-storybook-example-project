import Head from 'next/head'
import React from "react";

interface Props {
    title: string;
}

const Header: React.FunctionComponent<Props> = ({title}) => (
    <>
        <Head>
            <title>next-i18next</title>
        </Head>
        <h2>
            next-i18next
            <hr />
        </h2>
        <h1>
            {title}
        </h1>
    </>
);

export default Header
