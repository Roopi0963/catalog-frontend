import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { springApi } from "../api/axiosConfig";

// 1. Define the shape of your AuthContext data
interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
}

// 2. Create the context with an initial undefined value
// FIXED SYNTAX HERE:
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // FIXED SYNTAX HERE:
  const [user, setUser] = useState<User | null>(null);

  // FIXED SYNTAX HERE:
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // FIXED SYNTAX HERE:
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from storage on startup
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("vendorName");
    if (storedToken && storedName) {
      setUser({ name: storedName });
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await springApi.post("/auth/login", { email, password });
      const { token, vendorName } = response.data;

      // Save to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("vendorName", vendorName);

      setToken(token);
      setUser({ name: vendorName });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await springApi.post("/auth/register", userData);
      // Depending on backend, might auto-login or just return success
      const { token, vendorName } = response.data;

      if (token && vendorName) {
        localStorage.setItem("token", token);
        localStorage.setItem("vendorName", vendorName);
        setToken(token);
        setUser({ name: vendorName });
      }
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendorName");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create the custom hook for consuming the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
