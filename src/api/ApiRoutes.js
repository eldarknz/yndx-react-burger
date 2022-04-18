import { API_URL } from "../utils/constants";

const ApiRoutes = {
    auth: {
        login: `${API_URL}/auth/login`,
        register: `${API_URL}/auth/register`,
        logout: `${API_URL}/auth/logout`,
        token: `${API_URL}/auth/token`,
        user: `${API_URL}/auth/user`,
    },
    password_reset: {
        forgot_password: `${API_URL}/password-reset`,
        reset_password: `${API_URL}/password-reset/reset`,
    },
    ingredients: `${API_URL}/ingredients`,
    orders: `${API_URL}/orders`
};

export default ApiRoutes;
