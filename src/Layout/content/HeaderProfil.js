import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLORS, ROUTES } from '../../constants'
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginHorizontal: 20, }} onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={25} color='#fff' />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.Title}>TokoBatu</Text>
            </View>

            <TouchableOpacity style={{ marginHorizontal: 15, marginRight: 10 }} onPress={() => navigation.navigate(ROUTES.KERANJANG_TAB)}>
                <Icon name="cart" size={25} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 15, marginRight: 25 }} onPress={() => navigation.navigate(ROUTES.SETINGS)}>
                <Icon name="settings" size={25} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.black,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    Title: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    }
});