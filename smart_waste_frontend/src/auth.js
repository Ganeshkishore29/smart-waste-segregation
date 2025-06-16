
import axios  from "axios";
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;  // check if the user is logged in : logged in return True
};

export const logout=()=>{
    localStorage.removeItem('token')   // remove the token from the localstorage if the user is logout
    localStorage.removeItem('refresh') // remove the refresh token from the localstorage if the user is logout
}


export const isAdmin=()=>{
    const user_info=JSON.parse(localStorage.getItem('user_info')) //parse is convert the string to object
    return user_info?.is_superuser===true

}

export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh');
    try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refresh,
        });
        const newAccess = response.data.access;
        localStorage.setItem('token', newAccess);
        return newAccess;
    } catch (error) {
        console.error("Token refresh failed", error);
        return null;
    }
};