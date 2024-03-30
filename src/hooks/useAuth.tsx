import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = (): { userId: string | null; logout: () => void } => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Logic to retrieve the JWT token from local storage or any other source
    const token = localStorage.getItem("access_token");
    if (token) {
      // Logic to decode the JWT token and extract the user ID
      const decodedToken = jwtDecode(token);
      const { sub } = decodedToken;

      setUserId(sub ?? null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUserId(null);
    window.location.href = "/login";
  };

  return { userId, logout };
};

export default useAuth;
