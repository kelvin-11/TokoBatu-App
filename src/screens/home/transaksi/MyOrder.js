import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Features/userSlice'
import { Header } from '../../../Layout';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from "react-native-modal";
import axios from 'axios'

const MyOrder = (props) => {
    const navigation = props.navigation;
    const user = useSelector(selectUser);
    const secret_token = user.secret_token

    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [detail, setDetail] = useState([]);

    const toggleModal = React.useCallback((id) => () => {
        setModalVisible(true);
        axios(`http://192.168.1.27:8080/TokoBatu/web/api/pesanan/details?id=${id}`, {
            method: 'GET',
        })
            .then(response => {
                setDetail(response.data.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    const [history, setHistory] = useState([]);
    const getHistory = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                'http://192.168.1.27:8080/TokoBatu/web/api/pesanan/my-order', {
                method: 'GET',
                headers: {
                    'Auth': 'Bearer ' + secret_token
                }
            })
            const res = await response.json()
            setHistory(res.data);
            setLoading(false)
        } catch (e) {
            console.log(`Error ${e}`)
            setLoading(false)
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    const Hendler = ({ item, index }) => {
        const ttl_harga = item.total_harga + item.ongkir
        const Time = item.created_at
        const Date = moment(Time).format('DD-MM-Y');
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.colum}>
                        <Text style={styles.text}>{item.kode_unik}</Text>
                    </View>
                    <View style={styles.colum}>
                        <Text style={styles.text}>{Date}</Text>
                    </View>
                    <View style={styles.colum}>
                        <Text style={styles.text}>Rp. {ttl_harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    </View>
                    <View style={styles.colum}>
                        <TouchableOpacity
                            onPress={toggleModal(item.id)}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Icon name='eye' size={20} color={COLORS.white} style={styles.buttonText} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>
                        ___________________________________________________
                    </Text>
                </View>
            </View>
        )
    }

    const HandlerModal = ({ item, index }) => {
        const ttl_harga = item.total_harga + item.ongkir
        const Time = item.created_at
        const Date = moment(Time).format('DD-MM-Y');
        const row = item.detail_pesanan
        return (
            <View style={styles.contentModal}>
                <View style={styles.headerModal}>
                    <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: '800', top: 10, }}>
                        Detail Pesanan
                    </Text>
                    <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '600' }}>
                        ______________________________________________
                    </Text>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Penerima </Text>
                    </View>
                    <View style={{ marginLeft: 70 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>{item.user}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Tanggal Pesanan</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>{Date}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Kode Transaksi</Text>
                    </View>
                    <View style={{ marginLeft: 33 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>{item.kode_unik}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Produk pesanan</Text>
                    </View>
                    <View style={{ marginLeft: 29 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, }}>
                        {row &&
                            row.map(data => (
                                <Text style={styles.textModal}>
                                    ~ {data.product} ({data.jml})
                                </Text>
                            ))}
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Jasa kirim</Text>
                    </View>
                    <View style={{ marginLeft: 74 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>{item.jasa}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Perkiraan Sampai</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>


                        <Text style={styles.textModal}>{item.estimasi} Hari</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Harga Pesanan</Text>
                    </View>
                    <View style={{ marginLeft: 37 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>Rp. {item.total_harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Ongkir</Text>
                    </View>
                    <View style={{ marginLeft: 104 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>Rp. {item.ongkir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    </View>
                </View>

                <View style={styles.tableModal}>
                    <View style={styles.columModal1}>
                        <Text style={styles.textModal}>Total Harga</Text>
                    </View>
                    <View style={{ marginLeft: 66 }}>
                        <Text style={styles.textModal}>:</Text>
                    </View>
                    <View style={styles.columModal2}>
                        <Text style={styles.textModal}>Rp. {ttl_harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.container1}>
                <Header navigation={navigation} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <View style={styles.headerBody}>
                            <Text style={styles.textHeader}>Kode</Text>
                        </View>
                        <View style={styles.headerBody}>
                            <Text style={styles.textHeader}>Tanggal</Text>
                        </View>
                        <View style={styles.headerBody}>
                            <Text style={styles.textHeader}>Harga</Text>
                        </View>
                        <View style={styles.headerBody}>
                            <TouchableOpacity>
                                <Text style={styles.textHeader}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>
                            ________________________________________________
                        </Text>
                    </View>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={history}
                        refreshing={loading}
                        onRefresh={() => getHistory()}
                        renderItem={Hendler}
                    />

                    <Modal isVisible={isModalVisible} >
                        <SafeAreaView style={styles.containerModal}>

                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={detail}
                                renderItem={HandlerModal}
                            />

                            <View style={styles.bottom}>
                                <View style={styles.bottomContent}>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.buttonModal}
                                        activeOpacity={0.8}>
                                        <Icon name='undo' size={20} color={COLORS.white} />
                                        <Text style={styles.buttonTextModal}>Tutub</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </Modal>

                </View>
            </SafeAreaView>
        </>
    )
}

export default MyOrder;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 8,
        top: 12
    },
    headerBody: {
        paddingHorizontal: 25,
    },
    textHeader: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.black
    },

    //Handler
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    content: {
        flexDirection: 'row'
    },
    colum: {
        marginHorizontal: 19,
        marginVertical: 7,
        right: 10,
        top: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.abu_abu,
    },

    button: {
        backgroundColor: COLORS.green,
        padding: 5,
        margin: 0,
        borderRadius: 5,
        width: 45,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    //Button
    containerModal: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 8,
    },
    contentModal: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
    textModal: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.abu_abu
    },
    tableModal: {
        flexDirection: 'row',
        marginVertical: 11,
    },
    columModal1: {
        marginLeft: 20,
    },
    columModal2: {
        marginLeft: 10,
    },
    bottom: {
        backgroundColor: '#fff',
        borderColor: '#f6f6f6',
        borderRadius: 8,
    },
    bottomContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonModal: {
        backgroundColor: COLORS.red,
        padding: 12,
        margin: 12,
        borderRadius: 5,
        width: 170,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextModal: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginHorizontal: 12
    },
})