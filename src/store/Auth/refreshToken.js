import axios from "axios"
// import url from "../../json/config.json";

const api = process.env.REACT_APP_API;

let token = window.localStorage.getItem("token");
const config = { headers: { Authorization: `bearer ${token}` } };

export const refreshToken = async () => {
    const refresh_token = window.localStorage.getItem("refresh")
    if (!window.location.pathname.includes("/dashboard")) return;
    const res = await axios.post(`${api}/auth/refreshtoken`, { refreshToken: refresh_token }, config)

    if (res.status) {
        window.localStorage.setItem("token", res.data.data.accessToken);
        window.localStorage.setItem("refresh", res.data.data.refreshToken);
    }
    else {
        localStorage.removeItem("token")
        window.location.href = "/signin"
    }
}