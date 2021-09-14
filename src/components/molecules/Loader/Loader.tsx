import React from 'react';

export default function Loader(): React.ReactElement {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem',
            }}
        >
            Loading...
        </div>
    );
}
