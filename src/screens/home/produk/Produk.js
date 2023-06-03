import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, Dimensions, SafeAreaView, TextInput, } from 'react-native';
import ProdukCard from './ProdukCard';
import { COLORS } from '../../../constants';
import { Banner, Header } from '../../../Layout';
var { width } = Dimensions.get('window');
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

const Produk = props => {
    const { navigation } = props;

    const [kategori, setKategori] = useState([]);
    const getKategori = async () => {
        try {
            let linkkategoriproduk =
                'http://192.168.43.41:8080/TokoBatu/web/api/category';
            let res = await fetch(linkkategoriproduk, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            res = await res.json();
            setKategori(res.data);
        } catch (error) {
            alert(error.message);
        }
    };

    const funsiRefreshProduk = async id => {
        getData(id);
    };

    const [data, setData] = useState([]);
    const [products, setProduct] = useState([]);
    const getData = async (id_kat = null) => {
        try {
            let linkproduk =
                'http://192.168.43.41:8080/TokoBatu/web/api/products/list-produk';
            if (id_kat !== null) {
                linkproduk += '?id_kat=' + id_kat;
            }
            let res = await fetch(linkproduk, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            res = await res.json();
            setData(res.products);
            setProduct(res.products);
        } catch (error) {
            console.log(error.message);
        }
    };

    const Search = (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.nama_barang ? item.nama_barang.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            });
            setProduct(newData)
        } else {
            setProduct(data)
        }
    }

    useEffect(() => {
        getKategori();
        getData();
    }, []);

    return (
        <>
            <Header navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.green}}>
                <View style={{ marginHorizontal: 20, right: 10, bottom: 8 }}>
                    <Icon name='search' size={25} color='#fff' />
                </View>
                <View style={styles.Search}>
                    <TextInput
                        style={styles.input}
                        placeholder="Apa Yang Anda Butuhkan...?"
                        placeholderTextColor={COLORS.white}
                        onChangeText={(text) => Search(text)}
                    />
                </View>
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Banner />
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    paddingRight: 100,
                                    paddingTop: 2,
                                    fontSize: 20,
                                    marginLeft: 18,
                                }}>
                                Kategori
                            </Text>
                        </View>
                        <View>
                            <FlatList
                                data={kategori}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => funsiRefreshProduk(item.id)}
                                        style={{
                                            paddingVertical: 10,
                                            marginRight: 20,
                                            paddingHorizontal: 10,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            elevation: 3,
                                            marginBottom: 20,
                                            marginTop: 15,
                                            marginLeft: 15,
                                        }}>
                                        <Image
                                            source={{
                                                uri: 'http://192.168.43.41:8080/' + item.img,
                                            }}
                                            style={styles.buttonImageIconStyle}
                                        />
                                        <Text
                                            style={{ color: '#34354E', fontSize: 10, textAlign: 'center' }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <Text
                            style={{
                                color: 'black',
                                fontWeight: 'bold',
                                paddingTop: 3,
                                fontSize: 20,
                                textAlign: 'center',
                            }}>
                            Daftar produk
                        </Text>
                        <View style={{ marginTop: 0, marginBottom: 10 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#17b978',
                                }}>
                                _____________________________________________________
                            </Text>
                        </View>
                        <View style={styles.productCard}>
                            {products &&
                                products.map(product => (
                                    <ProdukCard
                                        key={product.id}
                                        product={product}
                                        navigation={navigation}
                                    />
                                ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Produk;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        width: width,
        padding: 6,
        marginVertical: 10,
        marginBottom: width / 6 - 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
    productCard: {
        width: width * 1 - 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Search: {
        width: '80%',
        right: 10,
    },
    input: {
        borderWidth: 2,
        borderColor: COLORS.white,
        padding: 12,
        marginBottom: 20,
        height: 45,
        color: COLORS.white,
        borderRadius: 10,
    },
});
