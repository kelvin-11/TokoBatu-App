// import React, { useContext } from 'react'
// import { ActivityIndicator, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthContext } from '../Redux/Context/AuthContext';
// import Auth from './Auth';
// import Click from './Click';

// function AppNav() {
//     const { isLoading, userToken } = useContext(AuthContext);
//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
//                 <ActivityIndicator size={'large'} />
//             </View>
//         )
//     }
//     return (
//         <NavigationContainer>
//             {userToken !== null ? <Click /> : <Auth />}
//         </NavigationContainer>
//     )
// }

// export default AppNav;