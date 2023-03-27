import { StyleSheet, View, ScrollView, Dimensions, Image, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

var { width } = Dimensions.get('window');

export default function Banner() {
    const [BannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            'https://i.pinimg.com/564x/6b/28/16/6b28163820d4615dcdbcdbfdd6f6ab2a.jpg',
            'https://i.pinimg.com/564x/df/20/54/df205447c7c7b7dc9393ce3201f72c19.jpg',
            'https://i.pinimg.com/564x/ff/3c/c7/ff3cc7cda64b9edb55d3861a32546f24.jpg',
        ]);
        return () => {
            setBannerData([]);
        };
    }, []);

    return (
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
                                    source={{ uri: item }}
                                    style={styles.banner}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
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
