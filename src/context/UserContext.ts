import { createContext } from 'react';
import { AppUser } from '../types/common';

export const UserContext = createContext<{
    user: { isLoggedIn: boolean; user?: AppUser } | undefined;
    setUser: (user: { isLoggedIn: boolean; user?: AppUser | undefined }) => void;
}>({
    user: undefined,
    setUser: () => {
        throw new Error('default setUser should not be used');
    },
});
UserContext.displayName = 'UserContext';
