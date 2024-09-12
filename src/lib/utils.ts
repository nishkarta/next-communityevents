import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Utility to check token expiration
export const isTokenExpired = (token: string): boolean => {
	try {
		const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT payload
		const expirationTime = decodedToken.exp * 1000; // `exp` is usually in seconds, convert to milliseconds
		return Date.now() >= expirationTime;
	} catch (error) {
		return true; // Return expired if token is invalid
	}
};
