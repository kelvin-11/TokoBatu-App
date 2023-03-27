import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper';
import { COLORS } from '../../constants';
var { width } = Dimensions.get('window');

export default function HeaderCheckout() {
    const [BannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            'https://i.pinimg.com/564x/91/56/ec/9156ec82a9f7f22ca6314745f8fbfa96.jpg',
            'https://i.pinimg.com/564x/fe/31/68/fe3168bc3db1cf931d8403e0c6ebe5e0.jpg',
            'https://i.pinimg.com/564x/83/66/a3/8366a3b1685cc651815e2b0999b6544a.jpg',
        ]);
        return () => {
            setBannerData([]);
        };
    }, []);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Swiper
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={3}
                        style={{
                            height: 200
                        }}>
                        {BannerData.map(item => {
                            return (
                                <Image
                                    key={item}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                    style={styles.banner}
                                />
                            );
                        })}
                    </Swiper>
                    <Text style={styles.text}>
                        INFO PENGIRIMAN
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        borderBottomColor: COLORS.black,
    },
    content: {
        width: width,
        marginTop: '5%',
        marginBottom: '5%',
        alignItems: 'center',
    },
    banner: {
        height: 200,
        width: 300,
        borderRadius: 20,
        marginHorizontal: 55,
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.green,
        marginTop: 15,
    }
})