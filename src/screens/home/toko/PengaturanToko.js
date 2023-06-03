import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, ROUTES } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Features/userSlice'
import { launchImageLibrary } from 'react-native-image-picker'
import { showError, showInfo } from '../../auth/utils/HelperFunction'
var { width } = Dimensions.get('window');

const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        maxHeight: 300,
        maxWidth: 300,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
    },
}

const PengaturanToko = ({ navigation }) => {
    const user = useSelector(selectUser);
    const secret_token = user.secret_token

    const [toko, setToko] = useState([]);
    const getToko = async () => {
        try {
            const res = await fetch('http://192.168.43.41:8080/TokoBatu/web/api/user/get-toko', {
                method: 'GET',
                headers: {
                    'Auth': 'Bearer ' + secret_token
                }
            });
            const { data } = await res.json();
            setToko(data)
        } catch (e) {
            console.log(`Error ${e}`)
        }
    }

    useEffect(() => {
        getToko()
    }, []);

    const [name, setName] = useState(null)
    const [no_whatsapp, setNoWhatsapp] = useState(null)
    const [alamat, setAlamat] = useState(null)
    const [deskripsi, setDeskripsi] = useState(null)
    const [banner, setBanner] = useState(null)

    const uploadBanner = async () => {
        const Banner = await launchImageLibrary(options)
        setBanner({
            uri: Banner.assets[0].uri,
            type: Banner.assets[0].type,
            name: Banner.assets[0].fileName,
        })
    }

    const Simpan = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('no_whatsapp', no_whatsapp)
            formData.append('alamat', alamat)
            formData.append('deskripsi', deskripsi)
            formData.append('flag', banner)

            if (banner !== null) {
                if (banner.type == null) {
                    showError('Type Gambar yang diizinkan hannya jpg,jepg,png,gif')
                }
            }

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/user/pengaturan-toko', {
                method: "POST",
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await res.json();
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB)
                showInfo("Berhasil Edit Toko")
            } else {
                showError("Mohon Lengkapi Data Register");
            }
        } catch (e) {
            console.log(`Error ${e}`)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.img}>
                        {toko.flag != ('/TokoBatu/web/upload/') ?
                            <Image source={{
                                uri: 'http://192.168.43.41:8080/' + toko.flag
                            }}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 140 / 2,
                                    backgroundColor: COLORS.white,
                                    borderColor: COLORS.abu_abu,
                                    borderWidth: 2
                                }}
                            />
                            :
                            <Image source={{
                                uri: 'https://i.pinimg.com/564x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
                            }}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 140 / 2,
                                }}
                            />
                        }
                    </View>

                    <View style={styles.body}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nama Toko"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={name}
                            defaultValue={toko.name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.input}
                            placeholder="Masukkan Ulang No.Whatsapp"
                            placeholderTextColor={COLORS.red}
                            editable={true}
                            value={no_whatsapp}
                            onChangeText={setNoWhatsapp}
                        />
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.input}
                            placeholder="Alamat"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={alamat}
                            defaultValue={toko.alamat}
                            onChangeText={setAlamat}
                            multiline={true}
                            numberOfLines={2}
                        />
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.inputDeskripsi}
                            placeholder="Deskripsi Toko"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={deskripsi}
                            defaultValue={toko.deskripsi}
                            onChangeText={setDeskripsi}
                            multiline={true}
                            numberOfLines={8}
                        />
                    </View>

                    <TouchableOpacity onPress={uploadBanner}>
                        <View style={styles.uploadImage}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                                Upload Banner
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <View style={styles.bottomContent}>
                    <TouchableOpacity
                        onPress={Simpan}
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PengaturanToko

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        paddingVertical: 13,
    },
    body: {
        width: '95%',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        height: 65,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    inputDeskripsi: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        height: 120,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    uploadImage: {
        marginVertical: 5,
        height: 50,
        width: width * 1 - 20,
        backgroundColor: COLORS.green,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    bottom: {
        backgroundColor: '#fff',
        borderColor: COLORS.grayLight,
        paddingVertical: 5,
    },
    bottomContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: COLORS.green,
        padding: 10,
        margin: 10,
        borderRadius: 5,
        fontSize: 18,
        width: 180,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})