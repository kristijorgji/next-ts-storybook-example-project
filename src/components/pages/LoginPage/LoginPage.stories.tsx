import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryWrapper from '../../../../.storybook/StoryWrapper';
import { pagesStory } from '../../utils';
import LoginPage from './LoginPage';
import { action } from '@storybook/addon-actions';

storiesOf(pagesStory('LoginPage'), module).add('default', () => {
    return (
        <StoryWrapper>
            <LoginPage
                onSubmit={action('onSubmit')}
                i18n={{
                    emailLabel: 'Email',
                    passwordLabel: 'Password',
                    loginBtn: 'Login',
                }}
            />
        </StoryWrapper>
    );
});
