import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, TextInput, Button, Alert, } from 'react-native';
import { useSelector } from 'react-redux';
var { width } = Dimensions.get('window');
var height = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';
import { selectUser } from '../../../Redux/Features/userSlice';
import { COLORS, ROUTES } from '../../../constants';
import { showDanger, showError, showSuccess } from '../../auth/utils/HelperFunction';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

export default function ProdukTokoDetails({ route, navigation }) {
    const user = useSelector(selectUser);
    const secret_token = user.secret_token

    const [ModalEdit, setModalEdit] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const [Kategori, setKategori] = useState([])
    const [kategori_id, setKategoriId] = useState(null)

    const toggleModal = (id) => {
        setModalEdit(true)
        axios('http://192.168.43.41:8080/TokoBatu/web/api/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                const count = Object.keys(res.data.data).length;
                let KategoriArray = [];
                for (let i = 0; i < count; i++) {
                    KategoriArray.push({
                        value: res.data.data[i].id,
                        label: res.data.data[i].name,
                    })
                }
                setKategori(KategoriArray)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const [image, setImage] = useState(null)
    const uploadImage = async () => {
        const images = await launchImageLibrary(options);
        setImage({
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName,
        })
    }

    const [name, setName] = useState(null)
    const [harga, setHarga] = useState(null)
    const [stok, setStok] = useState(null)
    const [berat, setBerat] = useState(null)
    const [deskripsi_produk, setDeskripsiProduk] = useState(null);

    const Simpan = async (id) => {
        try {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('category_id', kategori_id)
            formData.append('harga', harga)
            formData.append('stok', stok)
            formData.append('berat', berat)
            formData.append('deskripsi_produk', deskripsi_produk)
            formData.append('img', image)
            console.log(JSON.stringify(formData))

            if (image !== null) {
                if (image.type == null) {
                    alert('Type Gambar yang diizinkan hannya jpg,jepg,png,gif')
                }
            }

            const res = await fetch(
                `http://192.168.43.41:8080/TokoBatu/web/api/user/edit-produk?id=${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                    'Content-Tpye': 'multipart/form-data',
                }
            })
            const data = await res.json()
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB)
                showSuccess('Produk berhasil diEdit')
                setModalEdit(false)
            } else {
                showError('Produk gagal diEdit');
            }
        } catch (e) {
            console.log(e)
        }
    };

    const AlertHapus = (produk_id) => {
        Alert.alert(
            'Hapus Produk',
            'Yakin Menghapus Produk ini?',
            [{ text: 'Cancel' }, { text: 'Delete', onPress: () => Hapus(produk_id) }],
            { cancelable: false }
        );
    }

    const Hapus = async (produk_id) => {
        try {
            const res = await fetch(
                `http://192.168.43.41:8080/TokoBatu/web/api/user/remove-produk?id=${produk_id}`, {
                method: 'GET'
            })
            const data = await res.json();
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB);
                showSuccess('Berhasil Menghapus Produk');
            } else {
                showDanger('Gagal Menghapus Produk');
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View
            style={{
                elevation: 8,
                backgroundColor: '#fff',
                width: width * 1,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.swiper}>
                    <Swiper showButtons={true} autoplay={true} autoplayTimeout={4}>
                        <Image
                            source={{
                                uri: 'http://192.168.43.41:8080/' + route.params?.item.img,
                            }}
                            style={styles.banner}
                        />
                    </Swiper>
                </View>
                <View style={styles.details_box}>
                    <View style={styles.details}>
                        <View>
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 20,
                                    fontWeight: '600',
                                }}>
                                {route.params?.item.nama_barang}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 18,
                                    fontWeight: '600',
                                }}>
                                Rp. {route.params?.item.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderColor: 'green' }}>
                        <View style={{ marginTop: 0, marginBottom: 3 }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    textAlign: 'center',
                                    color: '#17b978',
                                }}>
                                _____________________________________________________
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginTop: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#333',
                                fontWeight: '600',
                            }}>
                            Kategori Produk  :
                        </Text>
                        <Text
                            style={{
                                color: '#333',
                                fontSize: 17,
                                fontWeight: '400',
                                marginLeft: 10,
                            }}>
                            {route.params?.item.category}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginTop: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#333',
                                fontWeight: '600',
                            }}>
                            Stok Produk         :
                        </Text>
                        <Text
                            style={{
                                color: '#333',
                                fontSize: 17,
                                fontWeight: '400',
                                marginLeft: 10,
                            }}>
                            {route.params?.item.stok}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginTop: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#333',
                                fontWeight: '600',
                            }}>
                            Berat Produk        :
                        </Text>
                        <Text
                            style={{
                                color: '#333',
                                fontSize: 17,
                                fontWeight: '400',
                                marginLeft: 10,
                            }}>
                            {route.params?.item.berat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Gram
                        </Text>
                    </View>
                    <View style={styles.description}>
                        <Text
                            style={{
                                color: '#333',
                                fontSize: 20,
                                fontWeight: '600',
                                textAlign: 'center',
                                marginTop: 10,
                            }}>
                            -- --- ----- Deskripsi Produk ----- --- --
                        </Text>
                        <Text
                            style={{
                                color: '#333',
                                fontSize: 16,
                                fontWeight: '400',
                                lineHeight: 20,
                                paddingTop: 12,
                                textAlign: 'left',
                            }}>
                            {route.params?.item.deskripsi_produk}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: width * 1 - 30,
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                        <View style={styles.reviews}>
                            <View style={{
                                textAlign: 'center',
                                marginVertical: 10,
                            }}>
                                <Button
                                    title="         Hapus         "
                                    color={COLORS.red}
                                    onPress={() => AlertHapus(route.params?.item.id)}
                                />
                            </View>
                            <View style={{
                                textAlign: 'center',
                                marginVertical: 10,
                                marginEnd: 12,
                            }}>
                                <Button
                                    title="           Edit           "
                                    color="#28c7fa"
                                    onPress={() => toggleModal(route.params?.item.id)}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <Modal isVisible={ModalEdit}>
                    <SafeAreaView style={styles.containerModal}>
                        <ScrollView>
                            <View style={styles.contentModal}>
                                <View style={styles.headerModal}>
                                    <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: '800', top: 10, }}>
                                        Edit Produk
                                    </Text>
                                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '600' }}>
                                        ______________________________________________
                                    </Text>
                                </View>

                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 10 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Nama Produk :</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nama Produk"
                                        placeholderTextColor={COLORS.abu_abu}
                                        editable={true}
                                        value={name}
                                        defaultValue={route.params?.item.nama_barang}
                                        onChangeText={setName}
                                    />
                                </View>

                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 5 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Kategori Produk :</Text>
                                    </View>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        itemTextStyle={styles.label}
                                        data={Kategori}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? (route.params?.item.category) : '...'}
                                        searchPlaceholder="Search..."
                                        value={kategori_id}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setKategoriId(item.value);
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>

                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 5 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Harga Produk :</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Harga"
                                        placeholderTextColor={COLORS.abu_abu}
                                        editable={true}
                                        value={harga}
                                        defaultValue={route.params?.item.harga.toString().replace(/\B(?=(\d{0})+(?!\d))/g, '.')}
                                        onChangeText={setHarga}
                                    />
                                </View>

                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 5 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Stok Produk :</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Stok"
                                        placeholderTextColor={COLORS.abu_abu}
                                        editable={true}
                                        value={stok}
                                        defaultValue={route.params?.item.stok.toString().replace(/\B(?=(\d{0})+(?!\d))/g, '.')}
                                        onChangeText={setStok}
                                    />
                                </View>
                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 5 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Berat Produk (gram):</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Berat (gram)"
                                        placeholderTextColor={COLORS.abu_abu}
                                        editable={true}
                                        value={berat}
                                        defaultValue={route.params?.item.berat}
                                        onChangeText={setBerat}
                                    />
                                </View>

                                <View style={styles.bodyModal}>
                                    <View style={{ left: 3, marginTop: 5 }}>
                                        <Text style={{ color: COLORS.abu_abu, fontSize: 15, fontWeight: '600' }}>Deskripsi Produk :</Text>
                                    </View>
                                    <TextInput
                                        style={styles.inputDeskripsi}
                                        placeholder="Deskripsi Produk"
                                        placeholderTextColor={COLORS.abu_abu}
                                        editable={true}
                                        value={deskripsi_produk}
                                        defaultValue={route.params?.item.deskripsi_produk}
                                        onChangeText={setDeskripsiProduk}
                                        multiline={true}
                                        numberOfLines={6}
                                    />
                                </View>

                                <View style={styles.cardUploadImage}>
                                    <TouchableOpacity onPress={uploadImage}>
                                        <View style={styles.uploadImage}>
                                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>
                                                Upload Image
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </SafeAreaView>

                    <View style={styles.bottom}>
                        <View style={styles.bottomContent}>
                            <TouchableOpacity
                                onPress={() => setModalEdit(false)}
                                style={styles.buttonModal}
                                activeOpacity={0.8}>
                                <Icon name='undo' size={20} color={COLORS.white} />
                                <Text style={styles.buttonTextModal}>Keluar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Simpan(route.params?.item.id)}
                                style={styles.buttonModal}
                                activeOpacity={0.8}>
                                <Icon name='save' size={22} color={COLORS.white} />
                                <Text style={styles.buttonTextModal}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 1,
        height: height * 1,
        backgroundColor: '#fff',
    },
    banner: {
        width: width * 1,
        height: width / 1 - 10,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    swiper: {
        width: width * 1,
        height: width / 2,
        backgroundColor: '#fff',
        position: 'relative',
    },
    details_box: {
        backgroundColor: '#e5e5e5',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        marginTop: 20,
        marginBottom: height / 8 - 60,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    reviews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: width * 1,
        padding: 10,
    },

    //Modal Tambah
    containerModal: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    bottom: {
        backgroundColor: '#fff',
        borderColor: '#f6f6f6',
        paddingVertical: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        paddingHorizontal: 5,
    },
    buttonModal: {
        backgroundColor: COLORS.green,
        padding: 12,
        margin: 10,
        borderRadius: 5,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextModal: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginHorizontal: 12,
        bottom: 2.5,
    },
    contentModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerModal: {
        flex: 1,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    bodyModal: {
        width: '95%',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 12,
        marginVertical: 10,
        height: 55,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    inputDeskripsi: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 12,
        marginVertical: 20,
        height: 120,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    cardUploadImage: {
        width: '95%',
    },
    uploadImage: {
        marginVertical: 10,
        height: 50,
        backgroundColor: COLORS.green,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    //Style Dropdown
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        height: 55,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    label: {
        position: 'absolute',
        paddingHorizontal: 10,
        fontSize: 14,
        color: COLORS.abu_abu
    },
    placeholderStyle: {
        fontSize: 14,
        color: COLORS.abu_abu
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.abu_abu
    },
    inputSearchStyle: {
        height: 45,
        fontSize: 16,
        borderRadius: 8,
        color: COLORS.abu_abu
    },
});