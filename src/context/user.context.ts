import React from 'react';
import User from '../models/User';

interface UserContextState {
    user: User;
    setUser: (user: User) => void;
}

// Define the User Context so we can conditionally show features to admin only
// const { user, setUser } = useContext(UserContext);
export const UserContext = React.createContext<UserContextState>({
    user: {
        email: "",
        admin: false
    },
    setUser: () => { }
});