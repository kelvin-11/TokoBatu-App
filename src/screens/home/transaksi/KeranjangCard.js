import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../../../constants';
import { showDanger, showError, showSuccess } from '../../auth/utils/HelperFunction';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Features/userSlice';

export default function KeranjangCard({ item, setisLoading }) {
    const user = useSelector(selectUser);

    const handleDecrement = (card_id) => {
        item.map((data) => {
            let cart = [];
            if (data.id === card_id) {
                if (data.jml === 1) {
                    showError('Pesanan Tidak bisa Kurang Dari 1, Silahkan Hapus Pesanan')
                    return false
                }
                const id = card_id
                const qty = data.jml > 1 ? data.jml -= 1 : 1;
                cart.push(data)
                { Quantity(id, qty) }
            }
        })
    }

    const handleIncrement = (card_id) => {
        item.map((data) => {
            let cart = [];
            if (data.id === card_id) {
                const id = card_id
                const qty = data.jml += 1;
                cart.push(data)
                { Quantity(id, qty) }
            }
        })
    }

    const secret_token = user.secret_token
    const Quantity = async (id, qty) => {
        try {
            setisLoading(true)
            const formData = new FormData();
            formData.append('id', id);
            formData.append('qty', qty);

            const res = await fetch('http://192.168.43.41:8080/TokoBatu/web/api/pesanan/updated', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token
                }
            })
            const data = await res.json();
            // console.log('Quantity ' + JSON.stringify(data));
            setisLoading(false)
        } catch (e) {
            console.log(`Error ${e}`);
            setisLoading(false)
        }
    }

    const HapusPesanan = (data) => {
        Alert.alert(
            'Hapus Pesanan',
            'Yakin Menghapus Pesanan ini?',
            [{ text: 'Cancel' }, { text: 'Delete', onPress: () => Hapus(data) }],
            { cancelable: false }
        );
    }

    const Hapus = async (data) => {
        const row = data.id
        const secret_token = user.secret_token
        try {
            setisLoading(true)
            const formData = new FormData();
            formData.append('id', row);

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/pesanan/remove-keranjang', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                },
            }
            );
            const data = await res.json();

            if (data.success === true) {
                showSuccess('Berhasil Menghapus Produk');
                setisLoading(false)
            } else {
                showDanger("Gagal Menghapus Produk");
                setisLoading(false)
            }
        } catch (e) {
            showError(`Error ${e}`)
            setisLoading(false)
        }
    }

    return (
        <>
            {item &&
                item.map(data => (
                    <SafeAreaView>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            marginBottom: 2,
                            height: 120
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                flexGrow: 1,
                                flexShrink: 1,
                                alignSelf: 'center',
                                marginStart: 20,
                            }}>
                                <TouchableOpacity style={{ paddingRight: 20 }}>
                                    <Image source={{
                                        uri: 'http://192.168.43.41:8080/' + data.img
                                    }}
                                        style={[styles.centerElement, { height: 90, width: 90, backgroundColor: '#eeeeee' }]}
                                    />
                                </TouchableOpacity>

                                <View style={{
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    alignSelf: 'center',
                                }}>
                                    <Text numberOfLines={2} style={{ color: COLORS.black, fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>{data.product}</Text>
                                    <Text numberOfLines={1} style={{ color: COLORS.black, marginBottom: 10, fontSize: 16 }}>Rp. {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                        <TouchableOpacity onPress={() => handleDecrement(data.id)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                                            <MaterialIcons name="remove" size={27} color="#3BB77E" />
                                        </TouchableOpacity>
                                        <Text style={{
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: '#cccccc',
                                            paddingHorizontal: 17,
                                            paddingTop: 3, 
                                            color: '#3BB77E',
                                            fontSize: 15
                                        }}>
                                            {data.jml}
                                        </Text>
                                        <TouchableOpacity onPress={() => handleIncrement(data.id)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                                            <MaterialIcons name="add" size={27} color="#3BB77E" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.centerElement, { width: 60 }]}>
                                <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => HapusPesanan(data)}>
                                    <Icons name="md-trash" size={25} color="#ee4d2d" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                ))}
        </>
    )
}

const styles = StyleSheet.create({
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});