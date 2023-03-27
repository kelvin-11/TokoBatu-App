import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native'
import { COLORS, ROUTES } from '../constants';
import { Keranjang, MyOrder, Produk, Profile } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from './Tabs';
import Auth from './Auth';
import { DrawerItems } from '../Layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Features/userSlice';

const Drawer = createDrawerNavigator();

const Main = () => {
    const user = useSelector(selectUser)
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.green,
                drawerActiveTintColor: COLORS.white,
                drawerInactiveTintColor: COLORS.black,
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                    marginVertical: 2,
                },
            }}
            initialRouteName={ROUTES.HOME_DRAWER}
            drawerContent={props => <DrawerItems {...props} />}>
            <Drawer.Screen
                name={ROUTES.HOME_DRAWER}
                component={Tabs}
                options={{
                    title: 'Home',
                    drawerIcon: ({ color }) => (
                        <Icon name="home-outline" size={25} color={color} />
                    ),
                }} />
            <Drawer.Screen
                name={ROUTES.PRODUK_DRAWER}
                component={Produk}
                options={{
                    title: 'Produk',
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/BottomTab/shop.png')}
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                opacity: focused ? 1 : 0.7,
                                tintColor: focused ? '#fff' : null,
                            }}
                        />
                    ),
                }} />
            {user ?
                <>
                    <Drawer.Screen
                        name={ROUTES.KERANJANG_DRAWER}
                        component={Keranjang}
                        options={{
                            title: 'Keranjang',
                            drawerIcon: ({ focused }) => (
                                <Image
                                    source={require('../assets/BottomTab/cart.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        opacity: focused ? 1 : 0.7,
                                        tintColor: focused ? '#fff' : null,
                                    }}
                                />
                            ),
                        }} />
                    <Drawer.Screen
                        name={ROUTES.MY_ORDER}
                        component={MyOrder}
                        options={{
                            title: "My Order",
                            drawerIcon: ({ color }) => (
                                <Icon name="reader-outline" size={25} color={color} />
                            ),
                        }} />
                    <Drawer.Screen
                        name={ROUTES.PROFILE_DRAWER}
                        component={Profile}
                        options={{
                            title: 'Profile',
                            drawerIcon: ({ color }) => (
                                <Icon name="person-circle-outline" size={25} color={color} />
                            ),
                        }} />
                </>
                :
                <>
                    <Drawer.Screen
                        name="L1"
                        component={Auth}
                        options={{
                            title: 'Keranjang',
                            drawerIcon: ({ focused }) => (
                                <Image
                                    source={require('../assets/BottomTab/cart.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        opacity: focused ? 1 : 0.7,
                                        tintColor: focused ? '#fff' : null,
                                    }}
                                />
                            ),
                        }} />
                    <Drawer.Screen
                        name="L2"
                        component={Auth}
                        options={{
                            title: "My Order",
                            drawerIcon: ({ color }) => (
                                <Icon name="reader-outline" size={25} color={color} />
                            ),
                        }} />
                    <Drawer.Screen
                        name={ROUTES.LOGIN_DRAWER}
                        component={Auth}
                        options={{
                            title: 'Profile',
                            drawerIcon: ({ color }) => (
                                <Icon name="person-circle-outline" size={25} color={color} />
                            ),
                        }} />
                </>
            }
        </Drawer.Navigator>
    )
}

export default Main;