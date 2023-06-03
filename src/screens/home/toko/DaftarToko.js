import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, View, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { COLORS, ROUTES } from '../../../constants';
import { selectUser } from '../../../Redux/Features/userSlice';
import { showDanger, showError, showInfo } from '../../auth/utils/HelperFunction';
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

const DaftarToko = ({ navigation }) => {
    const user = useSelector(selectUser);
    const secret_token = user.secret_token;

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

    const Daftar = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('no_whatsapp', no_whatsapp);
            formData.append('alamat', alamat);
            formData.append('deskripsi', deskripsi);
            formData.append('flag', banner);

            if (banner.type == null) {
                showError('Type Gambar yang diizinkan hannya jpg,jepg,png,gif')
            }

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/user/register-toko', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await res.json();
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB);
                showInfo('Berhasil Daftar Toko...Silahkan Login Ulang Terlebih Dahulu :)')
            } else if (data.message == 'terdaftar') {
                showDanger('Anda Telah Daftar Menjadi Penjual, Silahkan Login Ulang')
            } else {
                showError('Mohon Lengkapi Data Register')
            }
        } catch (e) {
            console.log(`Error ${e}`)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>

                    <View style={styles.body}>
                        <TextInput
                            style={[styles.input, { marginTop: 35 }]}
                            placeholder="Nama Toko"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            style={styles.input}
                            placeholder="No.Whatsapp"
                            placeholderTextColor={COLORS.abu_abu}
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
                        onPress={() => navigation.goBack()}
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Kembali</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={Daftar}
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DaftarToko;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: '95%',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 15,
        height: 65,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    inputDeskripsi: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 20,
        height: 120,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    bottom: {
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderColor: '#f6f6f6',
        paddingVertical: 5,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    button: {
        backgroundColor: COLORS.green,
        padding: 12,
        margin: 10,
        borderRadius: 5,
        fontSize: 18,
        width: 160,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    uploadImage: {
        marginVertical: 10,
        height: 50,
        width: width * 1 - 20,
        backgroundColor: COLORS.green,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});