import axios from 'axios';
import { login, register } from '../Features/userSlice';
import { showDanger } from '../../screens/auth/utils/HelperFunction';

// Login User
export const userLogin = (email, password) => async dispatch => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(
            `http://192.168.1.27:8080/TokoBatu/web/api/user/login`, {
            method: 'POST',
            body: formData,
        });
        const { data } = await response.json();
        console.log("Res ==> " + JSON.stringify(data));

        if (data === null) {
            showDanger('Email Atau Pasword Anda Salah')
        }

        dispatch(login(data));
    } catch (error) {
        showDanger(`Error Login, ${error}`)
    }
};

// Registration User
export const userRegister = (name, email, password) => async dispatch => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(
            `http://192.168.1.27:8080/TokoBatu/web/api/user/register`, {
            method: 'POST',
            body: formData,
        });
        const { data } = await response.json();
        console.log('Res ==> ' + JSON.stringify(data));

        dispatch(register(data));
    } catch (error) {
        showDanger(`Error Register ${error}`)
    }
};

// Log out User
// export const logOutUser = () => async dispatch => {
//     try {
//         await axios.get(`http://192.168.1.27:8080/TokoBatu/web/api/user/logout`);
//         dispatch({ type: 'userLogOutSucess' });
//     } catch (error) {
//         dispatch({ type: 'userLogOutFail', payload: error.response.data.message });
//     }
// };

// Forgot Password
// export const forgotPassword = email => async dispatch => {
//   try {
//     dispatch({type: 'forgotPasswordRequest'});

//     const config = {headers: {'Content-Type': 'application/json'}};

//     const {data} = await axios.post(
//       `http://192.168.1.4:80/ikm/web/api/user/forgot`,
//       {email},
//       config,
//     );
//     dispatch({type: 'forgotPasswordSuccess', payload: data.message});
//   } catch (error) {
//     dispatch({
//       type: 'forgotPasswordFailed',
//       payload: error.response.data.message,
//     });
//   }
// };