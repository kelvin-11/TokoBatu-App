import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, ROUTES } from '../../../constants'
import { HeaderProfil } from '../../../Layout'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Features/userSlice'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Profile = ({ navigation }) => {
    const user = useSelector(selectUser);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <HeaderProfil navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.img}>
                    {user.img != ('/TokoBatu/web/upload/') ?
                        <Image source={{
                            uri: 'http://192.168.1.27:8080/' + user.img
                        }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                backgroundColor: COLORS.white
                            }}
                        />
                        :
                        <Image source={{
                            uri: 'https://i.pinimg.com/564x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
                        }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                            }}
                        />

                    }
                </View>
                <View style={styles.text}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.white }}>{user.name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white, marginTop: 5 }}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={{ marginBottom: 30, marginEnd: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                        <Icon name='home' size={27} color={COLORS.black} />
                        <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.abu_abu, marginStart: 15 }}>{user.alamat}, {user.type}{user.kota}, {user.codepos}</Text>
                    </View>
                    <Text style={{ fontSize: 10, fontWeight: '500', color: COLORS.abu_abu }}>_______________________________________________________________________</Text>
                </View>
                <View style={{ marginBottom: 30, marginEnd: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                        <Icon name='whatsapp' size={28} color={COLORS.black} />
                        <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.abu_abu, marginStart: 17 }}>{user.no_hp}</Text>
                    </View>
                    <Text style={{ fontSize: 10, fontWeight: '500', color: COLORS.abu_abu }}>_______________________________________________________________________</Text>
                </View>
                <View style={{ marginLeft: 90 }}>
                    {user.role_id === 3 ?
                        <View style={{ marginBottom: 30 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.TOKO)}
                                style={styles.button}
                                activeOpacity={0.8}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                                    <Icon name="store" size={30} color={COLORS.white} />
                                    <Text style={styles.buttonText}>Toko Saya</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ marginBottom: 30 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.DAFTAR_TOKO)}
                                style={styles.button}
                                activeOpacity={0.8}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                                    <Icon name='handshake' size={30} color={COLORS.white} />
                                    <Text style={styles.buttonText}>Daftar Toko</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 0.4,
        backgroundColor: COLORS.black,
        flexDirection: 'row',
    },
    img: {
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    text: {
        justifyContent: 'flex-start',
        paddingVertical: 50,
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: COLORS.green,
        padding: 17,
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        fontSize: 15
    },
})