import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../Layout';
import { COLORS, ROUTES } from '../constants';
import Main from './Main';
import { Checkout, DaftarToko, PengaturanToko, Setings, Toko, Webview } from '../screens';

const Stack = createStackNavigator();

const Click = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            // headerTintColor: COLORS.white,
            // headerBackTitle: 'Back',
            // headerBackTitleVisible: false,
            // headerTitleAlign: 'center',
            // headerStyle: {
            //     backgroundColor: COLORS.primary,
            // }
        }} initialRouteName={ROUTES.SPLASH}>
            <Stack.Screen
                name={ROUTES.SPLASH}
                component={Splash} />
            <Stack.Screen
                name={ROUTES.HOME_CLICK}
                component={Main} />
            <Stack.Screen
                name={ROUTES.CHECKOUT}
                component={Checkout}
                options={{
                    headerShown: true,
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green
                    }
                }} />
            <Stack.Screen
                name={ROUTES.TOKO}
                component={Toko}
                options={{
                    headerTitle: 'Toko Saya',
                    headerShown: true,
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green
                    }
                }} />
            <Stack.Screen
                name={ROUTES.SETINGS}
                component={Setings}
                options={{
                    headerTitle: 'Edit Profil',
                    headerShown: true,
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green
                    }
                }} />
            <Stack.Screen
                name={ROUTES.DAFTAR_TOKO}
                component={DaftarToko}
                options={{
                    headerTitle: 'Daftar Toko',
                    headerShown: true,
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green
                    }
                }} />
            <Stack.Screen
                name={ROUTES.WEBVIEW}
                component={Webview} />
            <Stack.Screen
                name={ROUTES.PENGATURAN_TOKO}
                component={PengaturanToko}
                options={{
                    headerTitle: 'Edit Toko',
                    headerShown: true,
                    headerTintColor: COLORS.white,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: COLORS.green
                    }
                }} />
        </Stack.Navigator>
    );
};

export default Click;