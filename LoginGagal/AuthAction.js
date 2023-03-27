import { apiPost } from "../../screens/auth/utils/Utils";
import { LOGIN, REGISTER } from "../Config/Urls";

export function login(data){
        return apiPost(LOGIN, data)
}

export function register(data){
        return apiPost(REGISTER, data)
}