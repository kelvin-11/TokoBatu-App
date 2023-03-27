import { View, Text, StyleSheet, TouchableOpacity, TextInput, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants'
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

            {/* <TouchableOpacity style={{ marginHorizontal: 15, marginRight: 20 }}>
                <Icon name=''  size={} color='' />
            </TouchableOpacity> */}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.green,
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
    },
    input: {
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: COLORS.white,
        padding: 10,
        marginVertical: 0,
        borderRadius: 5,
        height: 27,
        paddingVertical: 0,
        color: '#fff',
    },
});