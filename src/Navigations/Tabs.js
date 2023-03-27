import React from 'react';
import { View, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Keranjang, ProductDetails, Produk, ProdukTokoDetails, Profile } from '../screens';
import { COLORS, ROUTES } from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Features/userSlice';
import Auth from './Auth';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const user = useSelector(selectUser);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, //tidak menampilkan header
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false, //tidak menampilkan name
                // headerBackTitle: 'Back',
                // tabBarActiveTintColor: '#2cb978', //warna active tab
                // headerTintColor: COLORS.white, //warna text header
                // headerBackTitleVisible: false, //tidak menampilkan nama route
                // headerTitleAlign: 'center', //text center
                // headerStyle: {
                //     backgroundColor: COLORS.primary,
                // } //warna background header
            }} initialRouteName={ROUTES.HOME_TAB}>
            <Tab.Screen
                name={ROUTES.HOME_TAB}
                component={SimpleScreen}
                options={({ route }) => ({
                    tabBarStyle: { display: Visibility(route) },
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={require('../assets/BottomTab/home.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    marginTop: 5,
                                    tintColor: focused ? '#2cb978' : 'black',
                                }}
                            />
                            <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                Home
                            </Text>
                        </View>
                    ),
                })} />
            <Tab.Screen
                name={ROUTES.PRODUK_TAB}
                component={Produk}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={require('../assets/BottomTab/shop.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    marginTop: 5,
                                    tintColor: focused ? '#2cb978' : 'black',
                                }}
                            />
                            <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                Produk
                            </Text>
                        </View>
                    ),
                }} />
            {user ?
                <>
                    <Tab.Screen
                        name={ROUTES.KERANJANG_TAB}
                        component={Keranjang}
                        options={{
                            // tabBarBadge: (Count),
                            // tabBarBadgeStyle: {
                            //     backgroundColor: COLORS.green,
                            //     color: COLORS.white,
                            // },
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image
                                        source={require('../assets/BottomTab/cart.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain',
                                            marginTop: 5,
                                            tintColor: focused ? '#2cb978' : 'black',
                                        }}
                                    />
                                    <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                        Keranjang
                                    </Text>
                                </View>
                            ),
                        }} />
                    <Tab.Screen
                        name={ROUTES.PROFILE_TAB}
                        component={Profile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image
                                        source={require('../assets/BottomTab/profile.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain',
                                            marginTop: 5,
                                            marginBottom: 0,
                                            tintColor: focused ? '#2cb978' : 'black',
                                        }}
                                    />
                                    <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                        Profile
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                </>
                :
                <>
                    <Tab.Screen
                        name="L1"
                        component={Auth}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image
                                        source={require('../assets/BottomTab/cart.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain',
                                            marginTop: 5,
                                            tintColor: focused ? '#2cb978' : 'black',
                                        }}
                                    />
                                    <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                        Keranjang
                                    </Text>
                                </View>
                            ),
                        }} />
                    <Tab.Screen
                        name="L2"
                        component={Auth}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Image
                                        source={require('../assets/BottomTab/profile.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain',
                                            marginTop: 5,
                                            marginBottom: 0,
                                            tintColor: focused ? '#2cb978' : 'black',
                                        }}
                                    />
                                    <Text style={{ color: focused ? '#2cb978' : 'black' }}>
                                        Profile
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                </>
            }
        </Tab.Navigator>
    );
}

const SimpleScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen
                name={ROUTES.PRODUK_DETAIL}
                component={ProductDetails}
                options={{
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green,
                    }
                }} />
            <Stack.Screen
                name={ROUTES.PRODUK_TOKO_DETAIL}
                component={ProdukTokoDetails}
                options={{
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green,
                    }
                }} />
        </Stack.Navigator>
    );
};

const Visibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    if (routeName === ROUTES.PRODUK_DETAIL) {
        return 'none';
    }
    if (routeName === ROUTES.PRODUK_TOKO_DETAIL) {
        return 'none';
    }
    if (routeName === 'Home') {
        return 'flex';
    }
};

export default Tabs;