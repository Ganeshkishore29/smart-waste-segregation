export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;  // check if the user is logged in : logged in return True
};

export const logout=()=>{
    return localStorage.removeItem('token')   // remove the token from the localstorage if the user is logout
}