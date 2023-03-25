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