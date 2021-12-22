import axios from "axios";

class Session {
  constructor() {
    this.SESSION_AUTH = "csp-session-auth";
    this.SESSION_DATA = "csp-session-data";
    this.api_url = process.env.ENV_API_URL || "localhost:8080";
  }

  _get(k) {
    return JSON.parse(localStorage.getItem(k));
  }

  _set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
    window.dispatchEvent(new Event("session-event"));
  }

  logged_in() {
    return this._get(this.SESSION_AUTH) != null;
  }

  log_out() {
    this._set(this.SESSION_DATA, null);
    this._set(this.SESSION_AUTH, null);
  }

  set_session_data(session_data) {
    this._set(this.SESSION_DATA, session_data);
  }

  session_data() {
    return this._get(this.SESSION_DATA);
  }

  set_login(basic_authentication) {
    this._set(this.SESSION_AUTH, basic_authentication);
  }

  _get_base_url() {
    return "http://" + this.api_url + "/api";
  }

  async get(endpoint, params_ = {}, urlParams = {}) {
    var payload = {
      headers: {
        authorization: this._get(this.SESSION_AUTH),
      },
    };
    if (Object.keys(params_).length > 0) {
      payload["params"] = params_;
    }
    var url = this._get_base_url() + "/" + endpoint;
    if (Object.keys(urlParams).length > 0) {
      const queryString = urlParams.toString();
      url += queryString.length > 0 ? "?" + queryString : "";
    }
    return axios.get(url, payload);
  }
}

export default Session;
