import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { COLORS, ROUTES } from '../../../constants';
import { HeaderCheckout } from '../../../Layout';
import { selectUser } from '../../../Redux/Features/userSlice';
import { showDanger, showError } from '../../auth/utils/HelperFunction';

const Checkout = ({ navigation }) => {
    const user = useSelector(selectUser);

    //Dropdown Data API
    const [isFocus, setIsFocus] = useState(false);
    const [DataProvinsi, setDataProvinsi] = useState([]);
    const [DataDistrict, setDataDistrict] = useState([]);
    const [DataJasa, setDataJasa] = useState([]);
    const [DataPaket, setDataPaket] = useState([]);

    //Value atau Nilai dari selected 
    const [provinsi, setPorvinsi] = useState(null);
    const [district, setDistrict] = useState(null);
    const [type, setType] = useState(null);
    const [codepos, setCodePos] = useState(null);
    const [jasa1, setJasa1] = useState(null);
    const [jasa2, setJasa2] = useState(null);
    const [paket, setPaket] = useState(null);
    const [paket1, setPaket1] = useState(null);

    const [provinsiLabel, setProvinsiLabel] = useState(null);
    const [districtLabel, setDistrictLabel] = useState(null);
    const [paketLabel, setPaketLabel] = useState(null);

    useEffect(() => {
        //Api Provinsi
        axios('http://192.168.43.41:8080/TokoBatu/web/api/jasa-kirim/provinsi', {
            method: 'GET',
        })
            .then(response => {
                const count = Object.keys(response.data.data).length;
                let provinsiArray = [];
                for (let i = 0; i < count; i++) {
                    provinsiArray.push({
                        value: response.data.data[i].province_id,
                        label: response.data.data[i].province,
                    })
                }
                setDataProvinsi(provinsiArray);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    //Api Kota/Kabupaten Dari provinsi terpilih
    const handleState = (provinsi) => {
        axios(`http://192.168.43.41:8080/TokoBatu/web/api/jasa-kirim/district?id_provinsi=${provinsi}`, {
            method: 'GET',
        })
            .then(response => {
                const count = Object.keys(response.data.data).length;
                let districtArray = [];
                for (let i = 0; i < count; i++) {
                    districtArray.push({
                        value: response.data.data[i].city_id,
                        value1: response.data.data[i].type,
                        value2: response.data.data[i].postal_code,
                        label: response.data.data[i].city_name,
                    })
                }
                setDataDistrict(districtArray);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        //API Jasa Kirim
        axios('http://192.168.43.41:8080/TokoBatu/web/api/jasa-kirim/jasa', {
            method: 'GET',
        })
            .then(res => {
                console.log('Jasa Kirim ' + JSON.stringify(res.data.data));
                const count = Object.keys(res.data.data).length;
                let jasaArray = [];
                for (let i = 0; i < count; i++) {
                    jasaArray.push({
                        value: res.data.data[i].id,
                        value1: res.data.data[i].slug,
                        label: res.data.data[i].name,
                    });
                }
                setDataJasa(jasaArray);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])
    //Api Paket
    const handlePaket = (district, courier) => {
        axios(`http://192.168.43.41:8080/TokoBatu/web/api/jasa-kirim/paket?destination=${district}&weight=1000&courier=${courier}`, {
            method: 'GET',
        })
            .then(response => {
                const count = Object.keys(response.data.data).length;
                let paketArray = [];
                for (let i = 0; i < count; i++) {
                    paketArray.push({
                        value: response.data.data[i].cost[0].value,
                        value1: response.data.data[i].cost[0].etd,
                        label: response.data.data[i].service + " Rp. " + response.data.data[i].cost[0].value,
                    })
                }
                setDataPaket(paketArray);
            })
            .catch(e => {
                console.log(`Error ${e}`)
            })
    }

    const secret_token = user.secret_token;

    //API Update Pesanan
    const Checkout = async () => {
        try {
            const formData = new FormData();
            formData.append('paket', paketLabel);
            formData.append('ongkir', paket);
            formData.append('estimasi', paket1);

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/pesanan/update-pesanan', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                }
            });
            const data = await res.json();
            if (data.success === true) {
                { CheckoutFiks() }
            }
        } catch (e) {
            showDanger('Pesanan Telah DiCheckout...Silahkan Refresh Keranjang');
        }
    }

    const [alamat, setAlamat] = useState(user.alamat);
    const [no_hp, setTlpn] = useState(user.no_hp);
    const [email, setEmail] = useState(user.email);

    //API Checkout
    const CheckoutFiks = async () => {
        try {
            const formData = new FormData();
            formData.append('alamat', alamat);
            formData.append('provinsi', provinsiLabel);
            formData.append('district', districtLabel)
            formData.append('type', type);
            formData.append('no_hp', no_hp);
            formData.append('codepos', codepos);
            formData.append('email', email);
            formData.append('jasa', jasa1);

            const res = await fetch(
                'http://192.168.43.41:8080/TokoBatu/web/api/pesanan/checkout', {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth': 'Bearer ' + secret_token,
                }
            }
            );
            const data = await res.json();
            console.log('Data Checkout ' + JSON.stringify(data));
            if (data.success === true) {
                navigation.navigate(ROUTES.MY_ORDER);
                navigation.navigate(ROUTES.WEBVIEW, { uri: data.url });
            } else {
                showError('Mohon Lengkapi Data Pesanan')
            }
        } catch (e) {
            showDanger(`Erro ${e}`);
        }
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <HeaderCheckout />
                <View style={styles.container}>
                    <View style={styles.alamat}>
                        <TextInput
                            style={styles.input}
                            placeholder="Alamat"
                            placeholderTextColor={COLORS.abu_abu}
                            editable={true}
                            value={alamat}
                            defaultValue={user.alamat}
                            onChangeText={setAlamat}
                        />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.width}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.label}
                                data={DataProvinsi}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Provinsi' : '...'}
                                searchPlaceholder="Search..."
                                value={provinsi}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setPorvinsi(item.value);
                                    setProvinsiLabel(item.label);
                                    handleState(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                        <View style={styles.width}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.label}
                                data={DataDistrict}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Kota/Kabupaten' : '...'}
                                searchPlaceholder="Search..."
                                value={district}
                                value1={type}
                                value2={codepos}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setDistrict(item.value);
                                    setType(item.value1);
                                    setCodePos(item.value2);
                                    setDistrictLabel(item.label);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.width}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.label}
                                data={DataJasa}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Jasa Kirim' : '...'} //isFocus tidak aktif
                                searchPlaceholder="Search..."
                                value={jasa1}
                                value1={jasa2}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setJasa1(item.value);
                                    setJasa2(item.value1);
                                    handlePaket(district, item.value1);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                        <View style={styles.width}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: COLORS.green }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.label}
                                data={DataPaket}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Paket Kirim' : '...'}
                                searchPlaceholder="Search..."
                                value={paket}
                                value1={paket1}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setPaket(item.value);
                                    setPaket1(item.value1);
                                    setPaketLabel(item.label);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.width}>
                            <TextInput
                                style={styles.input}
                                placeholder="No.Whatsapp"
                                placeholderTextColor={COLORS.abu_abu}
                                editable={true}
                                value={no_hp}
                                defaultValue={user.no_hp}
                                onChangeText={setTlpn}
                            />
                        </View>
                        <View style={styles.width}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={COLORS.abu_abu}
                                editable={false}
                                value={user.email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomContent}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Kembali</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={Checkout}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Bayar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Checkout;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
    },
    alamat: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    width: {
        width: '45%',
        marginHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        height: 55,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    bottom: {
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderColor: '#f6f6f6',
        paddingVertical: 5,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    button: {
        backgroundColor: COLORS.green,
        padding: 12,
        margin: 10,
        borderRadius: 5,
        fontSize: 18,
        width: 160,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    //Style Dropdown
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        height: 55,
        paddingVertical: 0,
        color: COLORS.abu_abu,
        borderRadius: 10,
    },
    label: {
        position: 'absolute',
        paddingHorizontal: 10,
        fontSize: 14,
        color: COLORS.abu_abu
    },
    placeholderStyle: {
        fontSize: 14,
        color: COLORS.abu_abu
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.abu_abu
    },
    inputSearchStyle: {
        height: 45,
        fontSize: 16,
        borderRadius: 8,
        color: COLORS.abu_abu
    },
});