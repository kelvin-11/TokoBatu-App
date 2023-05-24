import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View, Image, TextInput, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, ROUTES } from '../../../constants';
import { selectUser } from '../../../Redux/Features/userSlice';
import { showError, showInfo } from '../../auth/utils/HelperFunction';
var { width } = Dimensions.get('window');
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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

const Setings = ({ navigation }) => {
    const user = useSelector(selectUser);
    const secret_token = user.secret_token

    const [name, setName] = useState(user.name)
    const [alamat, setAlamat] = useState(user.alamat)
    const [no_hp, setTlpn] = useState(user.no_hp)
    const [avatar, setAvatar] = useState(null);

    const uploadImage = async () => {
        const images = await launchImageLibrary(options);
        setAvatar({
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName,
        })
    }

    const EditProfil = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('alamat', alamat)
            formData.append('no_hp', no_hp)
            formData.append('photo_url', avatar)

            if (avatar !== null) {
                if (avatar.type == null) {
                    showError('Type Gambar yang diizinkan hannya jpg,jepg,png,gif')
                }
            }

            const res = await fetch(
                'http://192.168.1.44:8080/TokoBatu/web/api/user/update-profile', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await res.json()
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB)
                showInfo('Profile Berhasil Dirubah...Silahkan Login Ulang Terlebih Dahulu :)')
            } else {
                showError('Ups...Maaf Terjadi Kesalahan')
            }
        } catch (e) {
            console.log(`Error ${e}`);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.img}>
                        {user.img != ('/TokoBatu/web/upload/') ?
                            <Image source={{
                                uri: 'http://192.168.1.44:8080/' + user.img
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
                        <View style={styles.width}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nama"
                                placeholderTextColor={COLORS.abu_abu}
                                editable={true}
                                value={name}
                                defaultValue={user.name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.width}>
                            <TextInput
                                style={styles.input}
                                placeholder="No Telpn"
                                placeholderTextColor={COLORS.abu_abu}
                                editable={true}
                                value={no_hp}
                                defaultValue={user.no_hp}
                                onChangeText={setTlpn}
                            />
                        </View>
                    </View>

                    <View style={styles.alamat}>
                        <TextInput
                            style={styles.inputAlamat}
                            placeholder="Alamat"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={alamat}
                            defaultValue={user.alamat}
                            onChangeText={setAlamat}
                            multiline={true}
                            numberOfLines={8}
                        />
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={uploadImage}>
                            <View style={styles.uploadImage}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                                    Upload Gambar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
                        onPress={EditProfil}
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Setings;

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
        paddingVertical: 30,
    },
    alamat: {
        width: '95%',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    width: {
        width: '45%',
        marginHorizontal: 20,
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
    inputAlamat: {
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