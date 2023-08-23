import React, { useContext } from 'react';
import { AuthContext } from '../utilities/AuthContext';
import ApexProfile from './apiCall';
import Login from '../utilities/auth';

const MainComponent = () => {
    const { currentUser, logout } = useContext(AuthContext); // destructure the logout function from context

    return (
        <div>
            {currentUser ? (
                <>
                    <button onClick={logout}>Logout</button> {/* render the logout button */}
                    <ApexProfile />
                </>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default MainComponent;
