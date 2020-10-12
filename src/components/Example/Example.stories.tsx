import React from 'react';
import { storiesOf } from '@storybook/react';
import Example from './Example';
import StoryWrapper from '../../../.storybook/StoryWrapper';

storiesOf('Example', module).add('with text', () => {
    return (
        <StoryWrapper>
            <Example text="Hello World" />
        </StoryWrapper>
    );
});
