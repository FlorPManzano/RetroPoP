// import { useState } from 'react';
// import authContext from '../contexts/authContext.js';
// import { userLocalStorageKey } from '../config';
// import proptypes from 'prop-types';
// // import isEmpty from '../helpers/isEmpty';

// function AuthProvider({ children }) {
//     const savedUser =
//         JSON.parse(localStorage.getItem(userLocalStorageKey)) || {};
//     const [userData, setUserData] = useState(savedUser);

//     const setUserHandler = (user = {}) => {
//         // if (isEmpty(user)) return;

//         localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
//         setUserData(user);
//     };

//     const logoutHandler = () => {
//         localStorage.removeItem(userLocalStorageKey);
//         setUserData(null);
//     };

//     const authValues = {
//         username: userData?.username ?? null,
//         token: userData?.token ?? null,
//         isAuthenticated: !!userData?.token,
//         setUser: setUserHandler,
//         logout: logoutHandler,
//     };

//     return (
//         <authContext.Provider value={authValues}>
//             {children}
//         </authContext.Provider>
//     );
// }

// export default AuthProvider;

// AuthProvider.propTypes = {
//     children: proptypes.node.isRequired,
// };
