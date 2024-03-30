import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AccountType } from "~/gql/graphql";

const useAuth = (): {
  userId: string | null;
  accountType: AccountType | null;
  logout: () => void;
} => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  useEffect(() => {
    // Logic to retrieve the JWT token from local storage or any other source
    const token = localStorage.getItem("access_token");
    if (token) {
      // Logic to decode the JWT token and extract the user ID
      const decodedToken = jwtDecode<{ sub: string; type: AccountType }>(token);
      const { sub, type } = decodedToken;
      setAccountType(type);
      setUserId(sub ?? null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUserId(null);
    window.location.href = "/login";
  };

  return { userId, accountType, logout };
};

export default useAuth;
