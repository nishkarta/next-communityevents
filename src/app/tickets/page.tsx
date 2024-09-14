"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { useAuth } from "@/components/providers/AuthProvider";
import withAuth from "@/components/providers/AuthWrapper";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card"; // Ensure you have a Card component
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner"; // Ensure you have a LoadingSpinner component

const TicketsPage = () => {
	const [registrations, setRegistrations] = useState<any[]>([]);
	const [filter, setFilter] = useState<string>("registered"); // Default filter
	const [loading, setLoading] = useState<boolean>(true); // Add loading state
	const { isAuthenticated, handleExpiredToken } = useAuth();
	const userData = isAuthenticated
		? JSON.parse(localStorage.getItem("userData") || "{}")
		: null;

	const fetchRegistrations = async () => {
		if (!userData?.token) return;

		setLoading(true); // Start loading

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/registration`,
				{
					headers: {
						"X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
						"Content-Type": "application/json",
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);

			if (response.status === 401) {
				// Handle expired token
				handleExpiredToken();
				return;
			}

			const data = await response.json();
			setRegistrations(data.data);
		} catch (error) {
			console.error("Failed to fetch registrations:", error);
		} finally {
			setLoading(false); // End loading
		}
	};

	useEffect(() => {
		fetchRegistrations();
	}, [userData?.token]);

	// Filter registrations based on selected status
	const filteredRegistrations = registrations.filter(
		(registration) => registration.status === filter
	);

	return (
		<>
			<HeaderNav name="Your Event Tickets" link="home" />
			<main className="p-8">
				<div className="flex flex-col mt-4 gap-y-4">
					{/* Filter buttons */}
					<div className="flex justify-center mb-4 gap-4">
						<button
							onClick={() => setFilter("registered")}
							className={`px-4 py-2 rounded ${
								filter === "registered"
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
						>
							Registered
						</button>
						<button
							onClick={() => setFilter("verified")}
							className={`px-4 py-2 rounded ${
								filter === "verified"
									? "bg-green-700 text-white"
									: "bg-gray-200"
							}`}
						>
							Verified
						</button>
					</div>

					{/* Display loading spinner if loading */}
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<LoadingSpinner />
						</div>
					) : (
						/* Display filtered registrations */
						<div className="flex flex-col mt-4 gap-y-8">
							{filteredRegistrations.length === 0 ? (
								<p className="text-center text-gray-500">
									No tickets available
								</p>
							) : (
								filteredRegistrations.map((registration) => (
									<Card
										key={registration.code}
										className="p-4 shadow-lg flex flex-col justify-center items-center gap-y-3 w-2/3 md:w-4/12 mx-auto"
									>
										<CardTitle>{registration.name}</CardTitle>
										<CardDescription>{registration.eventName}</CardDescription>
										<Badge
											className={`flex w-17 p-2 text-center justify-center items-center mb-2 ${
												registration.status === "registered"
													? "bg-blue-500"
													: registration.status === "verified"
													? "bg-green-700"
													: "bg-gray-400" // Default color for other statuses
											}`}
										>
											<span className="mx-auto">{registration.status}</span>
										</Badge>
										<Separator></Separator>
										<CardContent className="flex flex-col justify-center items-center">
											<p className="text-sm text-gray-700">
												<b>Session:</b> {registration.sessionName} (
												{registration.sessionCode})
											</p>
										</CardContent>
										{/* <p className="text-sm text-gray-700">
											<b>Code:</b> {registration.code}
										</p> */}
										{/* Additional details as needed */}
									</Card>
								))
							)}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default withAuth(TicketsPage);
