import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import Logo from '../../assets/icons/LOGO.svg';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../Redux/Actions/UserAction';
import validator from './utils/Validations'
import { showError } from './utils/HelperFunction';
import { selectUser } from '../../Redux/Features/userSlice';
import Click from '../../Navigations/Click';

const Register = ({ navigation }) => {
    const user = useSelector(selectUser);

    const [register, setRegister] = useState({
        name: '', email: '', password: '',
    });
    const { name, email, password } = register
    const updateRegister = (data) => setRegister(() => ({ ...register, ...data }))

    const dispatch = useDispatch();

    const isValidData = () => {
        const error = validator({
            name, email, password
        });
        if (error) {
            showError(error)
            return false
        }
        return true;
    }

    const Register = (e) => {
        e.preventDefault();
        const checkValid = isValidData()
        if (checkValid) {
            dispatch(userRegister(name, email, password));
        }
    };

    useEffect(() => {
        if (user !== null) {
            navigation.navigate(Click);
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.main}>
            {/* <ScrollView style={styles.scrol}> */}
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        {/* <Logo style={styles.mr7} /> */}
                        <Text style={styles.brandName}>TokoBatu</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>Sign Up Untuk Melanjutkan</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama"
                        placeholderTextColor="#000"
                        value={name}
                        onChangeText={(name) => updateRegister({ name })} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={email}
                        onChangeText={(email) => updateRegister({ email })} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => updateRegister({ password })} />

                    <View style={styles.loginBtnWrapper}>
                        <LinearGradient
                            colors={[COLORS.green, COLORS.gray]}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }}
                            end={{ y: 1.0, x: 0.0 }}>
                            {/******************** LOGIN BUTTON *********************/}
                            <TouchableOpacity activeOpacity={0.7} style={styles.loginBtn} onPress={Register}>
                                <Text style={styles.loginText}>Sign Up</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                            userId: 'X00',
                        })}
                        style={styles.forgotPassBtn}>
                        <Text style={styles.forgotPassText}>Forgot Password?</Text>
                    </TouchableOpacity> */}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}> Sudah Punnya Akun? </Text>
                    {/******************** REGISTER BUTTON *********************/}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.signupBtn}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        padding: 15,
        width: '100%',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.green,
        opacity: 0.9,
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
        color: '#000',
        borderRadius: 10,
    },
    // Login Btn Styles
    loginBtnWrapper: {
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    linearGradient: {
        width: '100%',
        borderRadius: 50,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
    },
    loginText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '600',
    },
    forgotPassText: {
        color: COLORS.green,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
    },
    // footer
    footer: {
        // position: 'absolute',
        // bottom: 20,
        marginTop: 30,
        textAlign: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    signupBtn: {
        color: COLORS.green,
        fontWeight: 'bold',
    },
    // utils
    wFull: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mr7: {
        marginRight: 7,
    },
});