import React, {Fragment} from 'react';
import {ThemeProvider} from 'styled-components';
import Light from "../src/styles/themes/Light/Light";


const getTheme = (theme?: string) => {
    switch (theme) {
        default:
            return Light;
    }
};

interface Props {
    theme?: string
}

const StoryWrapper: React.FC<Props> = (props) => (
    <ThemeProvider theme={getTheme(props.theme)}>
        <Fragment>
            {props.children}
        </Fragment>
    </ThemeProvider>
);

export default StoryWrapper;
