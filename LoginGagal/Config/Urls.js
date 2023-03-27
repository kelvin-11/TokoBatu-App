export const API_BASE_URL = "http://192.168.1.27:8080/TokoBatu/web/api/user/";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('login')
export const REGISTER = getApiUrl('register')
