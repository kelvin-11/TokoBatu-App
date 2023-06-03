import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
// import Logo from '../../assets/icons/LOGO.svg';
import validator from './utils/Validations'
import { showError } from './utils/HelperFunction';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../Redux/Actions/UserAction';
// import { CommonActions } from '@react-navigation/native';
// import { AuthContext } from '../../Redux/Context/AuthContext';
import { selectUser } from '../../Redux/Features/userSlice';
import Click from '../../Navigations/Click';

// class Login extends Component {
const Login = ({ navigation }) => {
    //===============================================================Youtube 3 ==================================================================================
    const user = useSelector(selectUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    console.log(email, password);

    const isValidData = () => {
        const error = validator({
            email, password
        });
        if (error) {
            showError(error)
            return false
        }
        return true;
    }

    const Submit = (e) => {
        e.preventDefault()
        const checkValid = isValidData()
        if (checkValid) {
            dispatch(userLogin(email, password));
        }
    }

    useEffect(() => {
        if (user !== null) {
            navigation.navigate(Click);
        }
    }, [user]);
    //================================================================Youtube 2 =================================================================================
    // const [email, setEmail] = useState(null);
    // const [password, setPassword] = useState(null);
    // const { onLogin } = useContext(AuthContext)

    //==================================================================Youtube 1 ====================================================================
    // const [login, setLogin] = useState({
    //     isLoading: false,
    //     email: '',
    //     password: '',
    // });
    // const { isLoading, email, password } = login
    // const updateLogin = (data) => setLogin(() => ({ ...login, ...data }))

    // const isValidData = () => {
    //     const error = validator({
    //         email,
    //         password,
    //     });
    //     if (error) {
    //         showError(error)
    //         return false
    //     }
    //     return true;
    // }

    // const onLogin = async () => {
    //     const checkValid = isValidData()
    //     if (checkValid) {
    //         try {
    //             updateLogin({ isLoading: true })
    //             const res = await Actions.login({
    //                 email, password
    //             });
    //             console.log('res==>', res);
    //             updateLogin({ isLoading: false })
    //         } catch (error) {
    //             console.log("error raised")
    //             showError(error.message)
    //             updateLogin({ isLoading: false })
    //         }
    //         // navigation.navigate(ROUTES.HOME)
    //     }
    // } //Kegagalan sungguh menyakitkan

    //========================================IKM LOGIN =====================================================================
    // const { error, isAuthenticated } = useSelector(
    //     (state) => state.user
    // );

    // const dispatch = useDispatch();

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // console.log(email, password);

    // const isValidData = () => {
    //     const error = validator({
    //         email, password,
    //     });
    //     if (error) {
    //         showError(error)
    //         return false
    //     }
    //     return true;
    // }

    // const Login = (e) => {
    //     e.preventDefault();
    //     const checkValid = isValidData()
    //     if (checkValid) {
    //         dispatch(userLogin(email, password));
    //     }
    // }

    // useEffect(() => {
    //     if (error) {
    //         showError(error)
    //         return false
    //     }
    //     if (isAuthenticated) {
    //         // navigation.navigate(ROUTES.SPLASH);
    //     }
    // }, [dispatch, error, isAuthenticated]);
    //========================================GITHUB LOGIN=============================================================================
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         password: '',
    //         // success: '',
    //         loading: false
    //     }
    // }

    // handleClick(navigate) {
    //     this.setState({
    //         loading: true
    //     });
    //     const data_email = this.state.email;
    //     const data_password = this.state.password;
    //     const formData = new FormData();
    //     formData.append('email',data_email);
    //     formData.append('password',data_password);
    //     const t = JSON.stringify(formData);
    //     // console.log("apppppp "+t)

    //     const response = fetch('http://192.168.43.41:8080/TokoBatu/web/api/user/login', {
    //         method: 'POST',
    //         headers: {
    //             // 'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         // body : formData, 
    //         body: JSON.stringify({ formData
    //         })
    //     })
    //     console.log("testting  "+response)
    //     .then((response) => response.json())
    //     .then((response) => {
    //         this.setState({
    //             loading: false
    //             }, () => {

    //             console.log("tesss "+JSON.stringify(response))
    //                 if (response) {
    //                     console.log(response);
    //                     // AsyncStorage.setItem('tokenUser', response.token);
    //                     // AsyncStorage.setItem('statusUser', response.status);
    //                     // AsyncStorage.setItem('idUser', response.id);
    //                     // AsyncStorage.setItem('Username', response.username);
    //                     // const resetAction = NavigationActions.reset({
    //                     //     index: 0,
    //                     //     actions: [
    //                     //         NavigationActions.navigate({ routeName: ROUTES.SPLASH })
    //                     //     ]
    //                     // })
    //                     // this.props.data.dispatch(resetAction)
    //                     const resetAction = CommonActions.reset({
    //                         index: 1,
    //                         routes: [{ name: ROUTES.SPLASH }]
    //                     });
    //                     navigate.dispatch(resetAction);
    //                 } else {
    //                     this.setState({ spinner: false });
    //                     setTimeout(() => {
    //                         showError('Username / Password Salah')
    //                     }, 100);
    //                 }
    //             }
    //             );
    //         }).done();
    // }

    // render() {
    //     const navigate = this.props.navigation;
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        {/* <Logo style={styles.mr7} /> */}
                        <Text style={styles.brandName}>TokoBatu</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>Login Untuk Melanjutkan</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={email}
                        onChangeText={setEmail} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />

                    <View style={styles.loginBtnWrapper}>
                        <LinearGradient
                            colors={[COLORS.green, COLORS.gray]}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }}
                            end={{ y: 1.0, x: 0.0 }}>
                            {/******************** LOGIN BUTTON *********************/}
                            <TouchableOpacity activeOpacity={0.7} style={styles.loginBtn} onPress={Submit}>
                                <Text style={styles.loginText}>Log In</Text>
                                {/* {!!isLoading ? <ActivityIndicator size="large" color="white" />
                                    : <Text style={styles.loginText}>Log In</Text>} */}
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
                    <Text style={styles.footerText}> Belum Punnya Akun? </Text>
                    {/******************** REGISTER BUTTON *********************/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                        <Text style={styles.signupBtn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
// }

export default Login;

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