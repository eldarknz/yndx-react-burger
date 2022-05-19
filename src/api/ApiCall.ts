import { ApiToken } from "./ApiToken";

interface ApiCallHeaders {
    [key: string] : string
}

interface ApiOptions {
    privateCall: boolean
}

export class ApiCall {
    
    // Api Endpoint
    private $url: string;

    // Api Data
    private $data = {};

    // Api Private call - Использовать JWT авторизацию
    private readonly $privateCall: boolean = true;

    // Api Options
    private $options: Record<string, any> = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
    }

    constructor(url: string, options: ApiOptions = {privateCall: false}) {
        this.$url = url;
        this.$privateCall = options.privateCall;
    }

    // Установка запроса с использованием JWT
    private setPrivateCall() {
        const accessToken = ApiToken.getAccessToken();

        if (accessToken) {
            this.setHeaders({
                "authorization": `Bearer ${accessToken}`
            })
        }
    }

    // GET запрос
    get() {
        this.$options = { ...this.$options, method: "GET" };
        return this.call();
    }

    // POST запрос
    post(requestData ?: any) {
        this.$data = requestData || null;

        this.$options = {
            ...this.$options,
            method: "POST",
            body: JSON.stringify({
                ...this.$data
            })
        };
        return this.call();
    }

    // PATCH запрос
    patch(requestData ?: any) {
        this.$data = requestData || null;

        this.$options = {
            ...this.$options,
            method: "PATCH",
            body: JSON.stringify({
                ...this.$data
            })
        };
        return this.call();
    }

    // Установка заголовков запроса
    setHeaders(headers : ApiCallHeaders) {
        this.$options = {
            ...this.$options,
            headers: {
                ...this.$options.headers,
                ...headers
            }
        }
        return this;
    }

    // Вызов сервиса
    private async call() {

        if (this.$privateCall) {
            this.setPrivateCall();
        }

        const response = await fetch(this.$url, {
            ...this.$options,
        });

        if (!response.ok){
            throw new Error(`${response.status}`);
        }

        const json = await response.json();

        return json;
    }
}