import { API_BASE_URL, API_KEY } from "@/lib/config";

async function fetchEvents(token: string) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
			headers: {
				"X-API-KEY": API_KEY,
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			cache: "no-store", // Ensures it fetches fresh data every time
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error("Unauthorized");
			}
			throw new Error("Failed to fetch events");
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching events:", error);
		return [];
	}
}
