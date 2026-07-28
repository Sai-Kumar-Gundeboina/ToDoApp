import axios from "axios";

const api = axios.create({
    baseURL: "https://upgraded-lamp-4pgpg9p5xvf755-8000.app.github.dev/",
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("Axios Base URL:", api.defaults.baseURL);

export default api;