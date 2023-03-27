import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, ForgotPassword } from '../screens';
import { COLORS, ROUTES } from '../constants';

const Stack = createStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: COLORS.white,
            // headerBackTitle: 'Back',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: COLORS.green,
            }
        }} initialRouteName={ROUTES.LOGIN}>
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={Login} />
            <Stack.Screen
                name={ROUTES.REGISTER}
                component={Register} />
            {/* <Stack.Screen
                name={ROUTES.FORGOT_PASSWORD}
                component={ForgotPassword}
                options={({ route }) => ({
                    title: route.params.userId,
                })} /> */}
        </Stack.Navigator>
    );
}

export default Auth;