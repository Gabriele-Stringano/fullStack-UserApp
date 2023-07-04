export const checkAuth = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PATH}/api/auth/isAutenticated`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await res.json();
    return data.result.authorised;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  await fetch(`${process.env.REACT_APP_PATH}/api/auth/logout`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
}

export const updateUser = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_PATH}/api/users/updateUser/${sessionStorage.getItem('user')}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const dataResult = await res.json();
    return dataResult;
  } catch (e) {
    console.log(e);
  }
};