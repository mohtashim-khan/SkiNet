import axios from 'axios';

class API {
    constructor(){
        this.api_url = process.env.ENV_API_URL || "localhost:8080";
        this.basic_auth = undefined;
    }

    _get_base_url() {
        return "http://" + this.api_url + "/api";
    }

    set_authentication(auth_str) {
        this.basic_auth = auth_str;
    }
    
    async get(endpoint, params_={}, urlParams={}) {
        var payload = {
            headers: {
                authorization: this.basic_auth
            }
        };
        if (Object.keys(params_).length > 0) {
            payload["params"] = params_;
        }
        var url = this._get_base_url() + "/" + endpoint;
        if (Object.keys(urlParams).length > 0) {
            const queryString = urlParams.toString();
            url += queryString.length > 0 ? "?" + queryString : "";
        }
        console.log(url)
        console.log(JSON.stringify(payload))
        return axios.get(url, payload);
    }

    async set(key, value, options){
        await this.cookie.set(key, value, options);
    }

    async remove(key, options){
        await this.cookie.remove(key,options);
    }
}

export default new API();