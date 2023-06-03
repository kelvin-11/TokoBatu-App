import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View, Image, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
var { width } = Dimensions.get('window');
import { useSelector } from 'react-redux';
import { COLORS, ROUTES } from '../../../constants';
import { selectUser } from '../../../Redux/Features/userSlice';
import ProdukTokoCard from './ProdukTokoCard';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { showSuccess } from '../../auth/utils/HelperFunction';

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

const Toko = ({ navigation }) => {
    const user = useSelector(selectUser);
    const secret_token = user.secret_token

    const [ModalTambah, setModalTambah] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const [kategori, setKategori] = useState([])
    const [kategori_id, setKategoriId] = useState(null);

    const toggleModal = () => {
        setModalTambah(true)
        axios('http://192.168.43.41:8080/TokoBatu/web/api/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
                setKategori(KategoriArray);
            })
            .catch(e => {
                console.log(e)
            })
    };

    const [image, setImage] = useState(null)
    const uploadImage = async () => {
        const images = await launchImageLibrary(options)
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
    const [deskripsi_produk, setDeskripsiProduk] = useState(null)

    const Simpan = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('category_id', kategori_id)
            formData.append('harga', harga)
            formData.append('stok', stok)
            formData.append('berat', berat)
            formData.append('deskripsi_produk', deskripsi_produk)
            formData.append('img', image)

            if (image !== null) {
                if (image.type == null) {
                    alert('Type Gambar yang diizinkan hannya jpg,jepg,png,gif')
                }
            }

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/user/create-produk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const data = await res.json()
            if (data.success == true) {
                navigation.navigate(ROUTES.PROFILE_TAB)
                showSuccess('Produk Berhasil Dibuat');
            } else {
                alert('Mohon Lengkapi Data')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const [produk, setProduk] = useState([]);
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
            setProduk(data.products)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getToko()
    }, []);
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
                                    borderColor: COLORS.black,
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
                    <Text style={{ fontSize: 20, fontWeight: '600', color: COLORS.black }}>{toko.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.black }}>_____________________________________________</Text>
                    <View style={styles.deskripsi}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: COLORS.black, marginTop: 5 }}>Tentang Toko</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.black, marginVertical: 10, marginHorizontal: 6 }}>{toko.deskripsi}</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={{ marginBottom: 30, marginEnd: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                                <Icon name='home' size={27} color={COLORS.black} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.abu_abu, marginStart: 15 }}>{toko.alamat}</Text>
                            </View>
                            <Text style={{ fontSize: 10, fontWeight: '500', color: COLORS.abu_abu }}>_______________________________________________________________________</Text>
                        </View>
                        <View style={{ marginBottom: 30, marginEnd: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                                <Icon name='whatsapp' size={28} color={COLORS.black} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.abu_abu, marginStart: 17 }}>{toko.no_whatsapp}</Text>
                            </View>
                            <Text style={{ fontSize: 10, fontWeight: '500', color: COLORS.abu_abu }}>_______________________________________________________________________</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Tambah Produk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(ROUTES.PENGATURAN_TOKO)}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Edit Toko</Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{
                            color: '#333',
                            fontWeight: 'bold',
                            paddingTop: 20,
                            fontSize: 20,
                            textAlign: 'center',
                        }}>
                        Produk Anda
                    </Text>
                    <View style={{ marginTop: 0, marginBottom: 10 }}>
                        <Text style={{ textAlign: 'left', color: '#17b978' }}>
                            _____________________________________________________
                        </Text>
                    </View>
                    <View style={styles.productCard}>
                        {produk &&
                            produk.map(product => (
                                <ProdukTokoCard
                                    key={product.id}
                                    product={product}
                                    navigation={navigation}
                                />
                            ))}
                    </View>
                    <View style={{ marginBottom: 10 }}></View>

                    <Modal isVisible={ModalTambah}>
                        <SafeAreaView style={styles.containerModal}>
                            <ScrollView>
                                <View style={styles.contentModal}>
                                    <View style={styles.headerModal}>
                                        <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: '800', top: 10, }}>
                                            Tambah Produk
                                        </Text>
                                        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '600' }}>
                                            ______________________________________________
                                        </Text>
                                    </View>

                                    <View style={styles.bodyModal}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nama Produk"
                                            placeholderTextColor={COLORS.abu_abu}
                                            editable={true}
                                            value={name}
                                            onChangeText={setName}
                                        />
                                    </View>
                                    <View style={styles.bodyModal}>
                                        <Dropdown
                                            style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            itemTextStyle={styles.label}
                                            data={kategori}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={!isFocus ? 'Kategori Produk' : '...'}
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
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Harga"
                                            placeholderTextColor={COLORS.abu_abu}
                                            editable={true}
                                            value={harga}
                                            onChangeText={setHarga}
                                        />
                                    </View>
                                    <View style={styles.bodyModal}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Stok"
                                            placeholderTextColor={COLORS.abu_abu}
                                            editable={true}
                                            value={stok}
                                            onChangeText={setStok}
                                        />
                                    </View>
                                    <View style={styles.bodyModal}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Berat (gram)"
                                            placeholderTextColor={COLORS.abu_abu}
                                            editable={true}
                                            value={berat}
                                            onChangeText={setBerat}
                                        />
                                    </View>
                                    <View style={styles.bodyModal}>
                                        <TextInput
                                            style={styles.inputDeskripsi}
                                            placeholder="Deskripsi Produk"
                                            placeholderTextColor={COLORS.abu_abu}
                                            editable={true}
                                            value={deskripsi_produk}
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
                                    onPress={() => setModalTambah(false)}
                                    style={styles.buttonModal}
                                    activeOpacity={0.8}>
                                    <Icon name='undo' size={20} color={COLORS.white} />
                                    <Text style={styles.buttonTextModal}>Keluar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={Simpan}
                                    style={styles.buttonModal}
                                    activeOpacity={0.8}>
                                    <Icon name='save' size={22} color={COLORS.white} />
                                    <Text style={styles.buttonTextModal}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Toko;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        paddingVertical: 20,
    },
    deskripsi: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: COLORS.green,
        padding: 12,
        margin: 0,
        marginBottom: 10,
        marginHorizontal: 27,
        borderRadius: 5,
        width: 160,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13,
    },
    productCard: {
        width: width * 1 - 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
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
        left: 1,
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
        marginVertical: 5,
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