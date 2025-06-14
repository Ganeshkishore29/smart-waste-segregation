
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;  // check if the user is logged in : logged in return True
};

export const logout=()=>{
    localStorage.removeItem('token')   // remove the token from the localstorage if the user is logout
    localStorage.removeItem('refresh') // remove the refresh token from the localstorage if the user is logout
}


export const isAdmin=()=>{
    const user_info=JSON.parse(localStorage.getItem('user_info'))
    return user_info?.is_superuser===true

}


export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return;  // no token found, is the user is logout

  try {
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {     //  await is waits for the response from the server before proceeding
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }), // send the refresh token to the server to get a new access token  like refresh:eyJotyyytdytid
    });

    const data = await response.json();
    if (data.access) {
      localStorage.setItem('token', data.access);
      return data.access;
    } else {
      logout();
    }
  } catch (err) {
    console.error('Token refresh failed', err);
    logout();
  }
};
