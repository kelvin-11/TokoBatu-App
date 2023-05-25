import { StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import React from 'react';
import { COLORS, ROUTES } from '../../../constants';

var { width } = Dimensions.get('window');

export default function ProdukTokoCard({ product, navigation }) {
    return (
        <>
            <SafeAreaView>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate(ROUTES.PRODUK_TOKO_DETAIL, { item: product })
                    }>
                    <View style={styles.ProductCard}>
                        <Image
                            source={{
                                uri: 'http://192.168.1.44:8080/' + product.img,
                            }}
                            style={styles.image}
                        />
                        <View>
                            <Text
                                style={{
                                    color: '#333',
                                    paddingVertical: 5,
                                    textAlign: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                {product.nama_barang}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}>
                                <Text
                                    style={{
                                        color: '#333',
                                        paddingHorizontal: 5,
                                        fontSize: 14,
                                    }}>
                                    Rp. {product.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </Text>

                                {/* <Text
                                    style={{
                                        color: '#333',
                                        paddingHorizontal: 5,
                                        fontSize: 15,
                                    }}>
                                    Stok ({product.stok})
                                </Text> */}
                            </View>
                        </View>
                        {product.stok === 0 ? (
                            <View style={styles.outOfStock}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 11,
                                        textAlign: 'center',
                                    }}>
                                    Stok Habis
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    ProductCard: {
        width: width / 2 - 25,
        height: width / 1.8,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: COLORS.white,
        flexWrap: 'wrap',
        margin: 10,
    },
    image: {
        width: '100%',
        height: width / 2 - 60,
        resizeMode: 'contain',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    outOfStock: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 50,
        position: 'absolute',
        top: -10,
        left: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});