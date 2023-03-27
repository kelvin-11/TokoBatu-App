import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, } from 'react-native';
var { width } = Dimensions.get('window');
import ProductCard from './produk/ProdukCard';
import { ScrollView, } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import { Header, Banner } from '../../Layout';

import { showSuccess } from '../auth/utils/HelperFunction';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/Features/userSlice';

const Home = ({ navigation }) => {
    const user = useSelector(selectUser)

    const [products, setProduct] = useState([])
    const getProduct = async () => {
        try {
            const response = await fetch('http://192.168.1.27:8080/TokoBatu/web/api/products/lates-produk', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            const data = await response.json()
            setProduct(data.products)
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        getProduct();

        if (user) {
            showSuccess('Berhasil Login');
        }
    }, [user]);

    return (
        <>
            <Header navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Banner />
                    <View style={styles.content}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#333',
                                textAlign: 'center',
                                marginTop: 5,
                                fontWeight: 'bold',
                            }}>
                            Produk Terbaru
                        </Text>
                        <View style={{ marginTop: 0, marginBottom: 10 }}>
                            <Text
                                numberOfLines={2}
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
                                    <ProductCard
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
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    content: {
        width: width,
        padding: 6,
        marginVertical: 10,
        marginBottom: width / 6 - 5,
    },
    productCard: {
        width: width * 1 - 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
