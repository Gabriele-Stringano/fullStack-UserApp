import axios from "axios";

export const checkAuth = async () => {
  try {
    const res = await fetch("/api/checkAuth", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.result.authorised;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  await fetch("/api/logout", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export const updateUser = async (data) => {
  try {
    const res = await fetch(`/api/updateUser/${sessionStorage.getItem('user')}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const dataResult = await res.json();
    return dataResult;
  } catch (e) {
    console.log(e);
  }
};