"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  handleExpiredToken: () => void;
  getValidAccessToken: () => Promise<string | null>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Done checking authentication
  }, []);

  const login = (data: any) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    router.push("/");
    router.refresh();
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const refreshToken = userData?.tokens?.find(
      (token: any) => token.type === "refreshToken"
    )?.token;

    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/users/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Update userData with new tokens
        userData.tokens = result.tokens;
        localStorage.setItem("userData", JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("An error occurred while refreshing token:", error);
      return false;
    }
  };

  const handleExpiredToken = async () => {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      toast({
        title: "Session refreshed!",
        description: "Your session has been refreshed.",
        className: "bg-green-400",
        duration: 3000,
      });
    } else {
      toast({
        title: "Session expired!",
        description: "Your session has expired. Please log in again.",
        className: "bg-red-400",
        duration: 3000,
      });
      logout();
      router.refresh();
    }
  };

  const getValidAccessToken = async (): Promise<string | null> => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const accessToken = userData?.tokens?.find(
      (token: any) => token.type === "accessToken"
    )?.token;
    const accessTokenExpiresAt = userData?.tokens?.find(
      (token: any) => token.type === "accessToken"
    )?.expiresAt;

    // Check if access token is expired
    if (accessToken && accessTokenExpiresAt) {
      const now = new Date();
      const expirationDate = new Date(accessTokenExpiresAt);
      if (expirationDate > now) {
        return accessToken; // Return valid access token
      }
    }

    // If access token is expired, refresh it
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newAccessToken = userData.tokens.find(
        (token: any) => token.type === "accessToken"
      )?.token;
      return newAccessToken;
    }

    return null; // Return null if no valid tokens are available
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        handleExpiredToken,
        getValidAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
