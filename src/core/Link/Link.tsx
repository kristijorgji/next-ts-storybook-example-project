import React from 'react';
import { default as NextLink } from 'next/link';
import { getRouteSource } from '../../getRouteSource';
import { UrlObject } from 'url';

const Link: React.FC<{ name: string | UrlObject; passHref?: boolean }> = ({ name, children, ...props }) => {
    return (
        <NextLink {...props} href={getRouteSource(name)}>
            {children}
        </NextLink>
    );
};

export default Link;
