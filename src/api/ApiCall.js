import { ApiToken } from "./ApiToken";
/*export const ApiCall = async (url, data) => {
    let options = null;

    if (data) {
        options = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    }

    const response = await fetch(url, options);
    
    if (!response.ok){
        throw new Error(response.status);
    }

    const json = await response.json();
    return json;
};*/

export class ApiCall {

    $url;
    $data = {};
    $privateCall = true;
    $options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
    }

    constructor(url, options = {privateCall: false}) {
        this.$url = url;
        this.$privateCall = options.privateCall;
    }

    setPrivateCall() {
        const accessToken = ApiToken.getAccessToken();

        if (accessToken) {
            this.setHeaders({
                "authorization": `${accessToken}`
            })
        }
    }

    // GET запрос
    get() {
        this.$options = { ...this.$options, method: "GET" };
        return this.call();
    }

    // POST запрос
    post(requestData) {
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

    setHeaders(headers) {
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
    async call() {
        //console.log("Call ---> ", this.$options);

        if (this.$privateCall) {
            this.setPrivateCall();
        }

        const response = await fetch(this.$url, {
            ...this.$options,
        });

        if (!response.ok){
            throw new Error(response.status);
        }

        const json = await response.json();

        return json;
    }
}