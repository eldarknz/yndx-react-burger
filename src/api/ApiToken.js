import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { getCookie, setCookie, deleteCookie } from "../utils/cookies";

export class ApiToken {

    //static getToken(token) {
    //    return localStorage.getItem(token) || "";
    //}

    static getAccessToken() {
        return getCookie(ACCESS_TOKEN);
    }

    static getRefreshToken() {
        return getCookie(REFRESH_TOKEN);
    }

    static setTokens(accessToken, refreshToken) {
        setCookie(ACCESS_TOKEN, accessToken, {expires: 20 * 60});
        setCookie(REFRESH_TOKEN, refreshToken);
    }

    static clear() {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
    }
}