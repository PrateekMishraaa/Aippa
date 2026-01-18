import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import authServicesApi from "@/services/authService";
import { useDispatch } from "react-redux";
import { getIsLoggedInUser } from "@/store/slices/authSlice";

interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	// note: Fetch logged-in user data when `isLoggedIn` is true
	const { data } = useQuery({
		queryKey: ["loggedInUser"],
		queryFn: () => authServicesApi.getLoggedInUser(),
		enabled: isLoggedIn === true,
	});

	// note: Check if a token exists in localStorage, indicating that the user is logged in and Dispatch the logged-in user data to the Redux store
	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
			dispatch(getIsLoggedInUser(data?.data.student));
		} else {
			setIsLoggedIn(false);
		}
	}, [data, dispatch]);

	const value = { isLoggedIn, setIsLoggedIn };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

// eslint-disable-next-line
export default useAuth;
