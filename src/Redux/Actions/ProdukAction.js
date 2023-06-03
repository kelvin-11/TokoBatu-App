import axios from 'axios';

export const getProduct = () => async dispatch => {
    try {
        dispatch({
            type: 'allProductRequest',
        });
        const { data } = await axios.get(
            'http://192.168.43.41:8080/TokoBatu/web/api/products/list-produk',
        );
        dispatch({
            type: 'allProductSuccess',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'allProductFail',
            payload: error.response.data.message,
        });
    }
};
