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

export const formatDate = (date: Date): string => {
	// Format the date with weekday, day, month, and year
	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: "long",
		day: "2-digit",
		month: "long",
		year: "numeric",
	};

	// Format the time with hours, minutes, and AM/PM
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true, // 12-hour format with AM/PM
	};

	// Format the date and time
	const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
		date
	);
	const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
		date
	);

	// Manually insert the comma after the weekday
	const dateParts = formattedDate.split(" ");
	// Reconstruct date with comma
	const formattedDateWithComma = `${dateParts[0]}, ${dateParts
		.slice(1)
		.join(" ")}`;

	// Combine formatted date and time
	return `${formattedDateWithComma}, ${formattedTime}`;
};
