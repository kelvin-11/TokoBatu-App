// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';
// import { BASE_URL } from './Config';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [userToken, setUserToken] = useState(null);
//     const [userInfo, setUserInfo] = useState(null);

//     const onLogin = (email, password) => {
//         setIsLoading(true);

//         console.log(email, password);

//         axios.post(`${BASE_URL}/login`, {
//             email, password
//         })
//             .then(res => {
//                 let userInfo = res.data
//                 setUserInfo(userInfo);
//                 setUserToken(userInfo.data.id);

//                 AsyncStorage.setItem('userToken', userInfo.data.id);
//                 AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

//                 console.log('User Data: ' + JSON.stringify(userInfo));
//                 console.log('User Id: ' + userInfo.data.id);
//             })
//             .catch(e => {
//                 console.log(`Login error ${e}`)
//             })
//         setIsLoading(false);
//     }

//     const LogOut = () => {
//         setIsLoading(true);
//         setUserToken(null);
//         AsyncStorage.removeItem('userInfo');
//         AsyncStorage.removeItem('userToken');
//         setIsLoading(false);
//     }

//     const isLoggedIn = async () => {
//         try {
//             setIsLoading(true);
//             let userInfo = await AsyncStorage.getItem('userInfo');
//             let userToken = await AsyncStorage.getItem('userToken');
//             userInfo = JSON.parse(userInfo);

//             if (userInfo) {
//                 setUserToken(userToken);
//                 setUserInfo(userInfo);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.log(`isLogged in error ${error}`)
//         }
//     }

//     useEffect(() => {
//         isLoggedIn()
//     }, []);

//     return (
//         <AuthContext.Provider value={{ onLogin, LogOut, isLoading, userToken, userInfo }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }