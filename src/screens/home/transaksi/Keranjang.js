import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import { COLORS, ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Features/userSlice';
import KeranjangCard from './KeranjangCard';
import { Header } from '../../../Layout';

export default function Keranjang(props) {
    const navigation = props.navigation;
    const user = useSelector(selectUser);
    const secret_token = user.secret_token;

    const [loading, setLoading] = useState(false);

    const [keranjang, setKeranjang] = useState([]);
    const getKeranjang = async () => {
        setLoading(true);
        try {
            const Base_Url =
                `http://192.168.43.41:8080/TokoBatu/web/api/pesanan/get-pesanan-user`;
            const response = await fetch(Base_Url, {
                method: 'GET',
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                },
            });
            const res = await response.json();
            setKeranjang(res.data);
            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getKeranjang()
    }, [])

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
                <Header navigation={navigation} />

                <FlatList
                    data={keranjang}
                    refreshing={loading}
                    onRefresh={() => getKeranjang()}
                    renderItem={({ item }) => (
                        <KeranjangCard
                            key={item.id}
                            item={item.detail_pesanan}
                            refreshing={loading}
                            setisLoading={() => getKeranjang(false)}
                        />
                    )}
                />

                {keranjang &&
                    keranjang.map(item => (
                        <View style={{ backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 4 }}>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.centerElement, { width: 60 }]}>
                                    <View style={[styles.centerElement, { width: 32, height: 32 }]}>
                                        <Icon name="ticket" size={25} color="#f0ac12" />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Voucher</Text>
                                    <View style={{ paddingRight: 20 }}>
                                        <TextInput
                                            style={{ paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4 }}
                                            placeholder="Enter voucher code"
                                            value={''}
                                            onChangeText={''}
                                        />
                                    </View>
                                </View>
                            </View> */}

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: 88,
                                paddingRight: 20,
                                paddingLeft: 20,
                                alignItems: 'center'
                            }}>
                                <View style={styles.total}>
                                    <Text style={{ color: COLORS.black, fontSize: 18, fontWeight: 'bold' }}>SubTotal : </Text>
                                    <Text numberOfLines={2} style={{ color: COLORS.green, fontSize: 18, fontWeight: 'bold' }}>Rp. {item.total_harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                </View>
                                <TouchableOpacity style={[styles.centerElement, {
                                    backgroundColor: COLORS.green,
                                    width: 120,
                                    height: 40,
                                    borderRadius: 5
                                }]}
                                    onPress={() => navigation.navigate(ROUTES.CHECKOUT)}>
                                    <Text style={{
                                        color: COLORS.white,
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>Checkout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    total: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
});