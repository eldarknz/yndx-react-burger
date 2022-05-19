import jwt_decode from "jwt-decode";
import { ApiToken } from "../api/ApiToken";

// check object is empty
export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
}

// Check access token
export const checkAccessToken = () => {
    const accessToken = ApiToken.getAccessToken();
    if (accessToken) {
        const decodedToken: any = jwt_decode(accessToken);
        const currentTime = new Date().getTime();
        if (decodedToken.exp * 1000 < currentTime) {
            return false;
        }
    }
    return accessToken ? true : false;
}