import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants';

const ForgotPassword = () => {
    const route = useRoute();

    return (
        <View style={styles.container}>
            <Text style={{ color: '#3f3b3b' }}>ForgotPassword</Text>
            <Text style={{ color: '#3f3b3b' }}>Params: {route.params.userId}</Text>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});