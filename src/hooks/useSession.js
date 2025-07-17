import { useState, useEffect } from 'react';

export default function useSession() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) setUser(session);
  }, []);

  const login = (data) => {
    localStorage.setItem("session", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return { user, login, logout };
}
