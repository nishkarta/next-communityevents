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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		const userData = localStorage.getItem("userData");
		setIsAuthenticated(!!userData);
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

	const handleExpiredToken = () => {
		toast({
			title: "Session expired!",
			description: `Error : Your session has expired. Please log in again.`,
			className: "bg-red-400",
			duration: 3000,
		});
		logout();
		router.refresh();
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, handleExpiredToken }}
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
