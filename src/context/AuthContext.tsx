import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import authServicesApi, { UserType } from "@/services/authService";
import { useDispatch } from "react-redux";
import { getIsLoggedInUser } from "@/store/slices/authSlice";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Check localStorage on initial load
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    return !!(token && userStr);
  });

  const [user, setUser] = useState<UserType | null>(() => {
    // Get user from localStorage on initial load
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  });

  // Fetch logged-in user data when `isLoggedIn` is true
  const { data } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => authServicesApi.getLoggedInUser(),
    enabled: isLoggedIn === true && !user, // Only fetch if logged in and user not already set
  });

  // Update user state and dispatch to Redux when data is fetched
  useEffect(() => {
    if (data?.data?.student) {
      setUser(data.data.student);
      dispatch(getIsLoggedInUser(data.data.student));
    } else if (data?.data?.data) {
      // Alternative response format
      setUser(data.data.data);
      dispatch(getIsLoggedInUser(data.data.data));
    }
  }, [data, dispatch]);

  // Check token on mount and update login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const userObj = JSON.parse(userStr);
        setUser(userObj);
        dispatch(getIsLoggedInUser(userObj));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [dispatch]);

  // Optional: Listen for storage changes (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        
        if (token && userStr) {
          setIsLoggedIn(true);
          try {
            const userObj = JSON.parse(userStr);
            setUser(userObj);
            dispatch(getIsLoggedInUser(userObj));
          } catch (error) {
            console.error("Error parsing user from localStorage:", error);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  const value = { 
    isLoggedIn, 
    setIsLoggedIn, 
    user, 
    setUser 
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;