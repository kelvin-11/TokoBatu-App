import { StyleSheet, View, ScrollView, Dimensions, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

var { width } = Dimensions.get('window');

export default function Banner() {
    const [BannerData, setBannerData] = useState([]);
    const getBanner = async () => {
        try {
            let res = await fetch('http://192.168.1.44:8080/TokoBatu/web/api/banner', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            const data = await res.json();
            setBannerData(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBanner();
    }, []);

    return (
        (BannerData != null &&
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.swiper}>
                        <Swiper
                            showButtons={false}
                            autoplay={true}
                            autoplayTimeout={4}
                            style={{
                                height: width / 2,
                            }}>
                            {BannerData.map(item => {
                                return (
                                    <Image
                                        key={item}
                                        resizeMode="contain"
                                        source={{ uri: 'http://192.168.1.44:8080/' + item.image }}
                                        style={styles.banner}
                                    />
                                );
                            })}
                        </Swiper>
                        <View style={{ height: 20 }}></View>
                    </View>
                </View>
            </ScrollView>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
    },
    swiper: {
        width: width,
        marginTop: '5%',
        alignItems: 'center',
    },
    banner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
});
