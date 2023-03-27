import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, TextInput, Button, Linking, } from 'react-native';
import { useSelector } from 'react-redux';
var { width } = Dimensions.get('window');
var height = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';
import { selectUser } from '../../../Redux/Features/userSlice';
import { ROUTES } from '../../../constants';
import { showDanger, showError, showSuccess } from '../../auth/utils/HelperFunction';

export default function ProductDetails({ route, navigation }) {
    const user = useSelector(selectUser);

    const stok = route.params?.item.stok
    const produk_id = route.params?.item.id;
    const qty = 1;

    const Keranjang = async () => {
        if (user !== null) {
            const secret_token = user.secret_token;
            if (stok !== 0) {
                try {
                    const formData = new FormData();
                    formData.append('produk_id', produk_id);
                    formData.append('qty', qty);

                    const res = await fetch(
                        'http://192.168.1.27:8080/TokoBatu/web/api/pesanan/create-keranjang', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Auth': 'Bearer ' + secret_token,
                        },
                    }
                    );
                    const data = await res.json();

                    if (data !== null) {
                        showSuccess('Produk Berhasil DiMasukkan Ke Keranjang')
                    } else {
                        showDanger("Gagal Memasukkan Produk Ke Keranjang");
                    }

                } catch (e) {
                    console.log(`Error Keranjang ${e}`);
                    showDanger("Gagal Memasukkan Produk Ke Keranjang");
                }
            } else {
                showError('Stok Produk Saat Ini Telah Habis');
            }
        } else {
            navigation.navigate(ROUTES.LOGIN_DRAWER);
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
                                uri: 'http://192.168.1.27:8080/' + route.params?.item.img,
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
                                textAlign: 'center',
                            }}>
                            {route.params?.item.deskripsi_produk}
                        </Text>
                    </View>
                    {/* <View style={styles.quantity}>
                        <View style={styles.quantityBox}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#fff',
                                    fontWeight: '800',
                                }}>
                                -
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 16,
                                }}>
                                1
                            </Text>
                        </View>
                        <View style={styles.quantityBox}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#fff',
                                    fontWeight: '800',
                                }}>
                                +
                            </Text>
                        </View>
                    </View> */}

                    <View
                        style={{
                            width: width * 1 - 30,
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                        {/* <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(
                                        'https://wa.me/' +
                                        route.params?.item.toko.no_whatsapp +
                                        '?text=Saya tertarik dengan produk ini,apakah stok produk ' +
                                        route.params?.item.nama_barang +
                                        ' masih tersedia?',
                                    )
                                }>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}>
                                    Hubungi Penjual Lewat WhatsApp
                                </Text>
                            </TouchableOpacity>
                        </View> */}

                        <View style={styles.reviews}>
                            <View style={{
                                textAlign: 'center',
                                marginVertical: 10,
                            }}>
                                <Button
                                    title="       Kembali       "
                                    color="#3BB77E"
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                            <View style={{
                                textAlign: 'center',
                                marginVertical: 10,
                                marginEnd: 12,
                            }}>
                                <Button
                                    title="    keranjang    "
                                    color="#3BB77E"
                                    onPress={Keranjang}
                                />
                            </View>
                        </View>
                    </View>
                </View>
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
    // productDetailsTop: {
    //   width: width * 1,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   height: width / 6 - 20,
    //   paddingHorizontal: 10,
    //   elevation: 8,
    //   backgroundColor: '#fff',
    // },
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
    // quantity: {
    //   flexDirection: 'row',
    //   marginTop: 10,
    //   alignItems: 'center',
    // },
    // quantityBox: {
    //   width: 40,
    //   height: 40,
    //   backgroundColor: '#3BB77E',
    //   borderRadius: 5,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 10,
    // },
    // button: {
    //   width: '85%',
    //   backgroundColor: '#3BB77E',
    //   height: 50,
    //   marginTop: 20,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderRadius: 10,
    // },
    // submitButton: {
    //   width: '40%',
    //   backgroundColor: '#3BB77E',
    //   marginTop: 20,
    //   borderRadius: 5,
    //   paddingVertical: 15,
    //   textAlign: 'center',
    //   color: '#fff',
    //   fontSize: 18,
    //   fontWeight: '600',
    // },
    reviews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: width * 1,
        padding: 10,
    },
});