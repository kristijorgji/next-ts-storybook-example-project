import React from 'react';
import { FormControl, Wrapper } from './LoginPage.style';

export interface Credentials {
    email: string;
    password: string;
}

interface Props {
    i18n: {
        emailLabel: string;
        passwordLabel: string;
        loginBtn: string;
    };
    onSubmit: (c: Credentials) => void;
}

export default function LoginPage(p: Props): React.ReactElement {
    const [value, setValue] = React.useState<Credentials>({ email: '', password: '' });

    const setField = (key: keyof Credentials, v: unknown) => {
        setValue({
            ...value,
            [key]: v,
        });
    };

    return (
        <Wrapper>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    p.onSubmit(value);
                }}
            >
                <FormControl>
                    <label htmlFor="name">{p.i18n.emailLabel}</label>
                    <input
                        id="email"
                        required={true}
                        type="text"
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                            setField('email', event.target.value as string)
                        }
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="password">{p.i18n.passwordLabel}</label>
                    <input
                        id="password"
                        required={true}
                        type="password"
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                            setField('password', event.target.value as string)
                        }
                    />
                </FormControl>
                <div
                    style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                    }}
                >
                    <button>{p.i18n.loginBtn}</button>
                </div>
            </form>
        </Wrapper>
    );
}
