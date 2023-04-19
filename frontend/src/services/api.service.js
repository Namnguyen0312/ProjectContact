import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": undefined,
    },
};
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};