import { createContext, ReactNode, useContext } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";

interface HookContextType {
	location: Location;
	navigate: ReturnType<typeof useNavigate>;
}

const HookContext = createContext<HookContextType | undefined>(undefined);

export const HookProvider = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const value = { location, navigate };
	return <HookContext.Provider value={value}>{children}</HookContext.Provider>;
};

const useHooks = (): HookContextType => {
	const context = useContext(HookContext);
	if (!context) {
		throw new Error("useHooks must be used within a HookProvider");
	}
	return context;
};

//eslint-disable-next-line
export default useHooks;
