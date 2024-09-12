"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const EventSessions = () => {
	const { eventCode } = useParams(); // Retrieve eventCode from the route params
	const [sessions, setSessions] = useState<any[]>([]); // State to hold sessions
	const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading
	const [error, setError] = useState<string | null>(null); // State for errors

	// Fetch sessions when the component mounts or when eventCode changes
	useEffect(() => {
		async function fetchSessions() {
			const userData = JSON.parse(localStorage.getItem("userData") || "{}");
			if (!userData.token || !eventCode) return;
			console.log(userData.token);
			setIsLoading(true); // Set loading state
			setError(null); // Reset error state

			try {
				const response = await fetch(
					`${API_BASE_URL}/api/v1/events/${eventCode}/sessions`,
					{
						headers: {
							"X-API-KEY": API_KEY || "",
							"Content-Type": "application/json",
							Authorization: `Bearer ${userData.token}`, // Attach the token
						},
					}
				);

				if (response.status === 401) {
					console.error("Unauthorized - Token expired or invalid");
					return;
				}

				const data = await response.json();
				console.log(data.data);
				setSessions(data.data); // Update sessions state
			} catch (error) {
				console.error("Failed to fetch sessions:", error);
				setError("Failed to load sessions. Please try again later.");
			} finally {
				setIsLoading(false); // Stop loading state
			}
		}

		fetchSessions();
	}, [eventCode]);

	return (
		<>
			<HeaderNav name="Event Sessions" link="events" />
			<main>
				<div className="flex flex-col ml-7 my-4">
					<span className="text-2xl font-bold">HOMEBASE 2024</span>
					<span className="text-sm font-normal mt-1">
						Sessions for event code: {eventCode}
					</span>
				</div>
				<Separator className="space-y-3 my-4" />

				{/* Loading and Error States */}
				{isLoading ? (
					<LoadingSpinner />
				) : error ? (
					<p className="text-center text-red-500">{error}</p>
				) : sessions.length === 0 ? (
					<p className="text-center">No sessions available for this event.</p>
				) : (
					// Display fetched sessions
					sessions.map((session) => (
						<Card key={session.id} className="rounded-xl mx-2 my-5">
							<div className="flex flex-col">
								<CardHeader>
									<CardTitle>{session.name}</CardTitle> {/* Session Name */}
									<CardDescription>
										Session {session.sessionNumber}
									</CardDescription>{" "}
									{/* Session Number */}
								</CardHeader>
								<CardContent className="flex flex-col">
									<Badge className="w-14 bg-green-700 text-center mb-2">
										{session.status}
									</Badge>
									<p className="text-base font-light my-2 pb-2">
										{session.description}
									</p>
									<Separator />
									<div className="mt-2 pt-4">
										<p className="font-semibold text-gray-700">Event Time:</p>
										<p className="text-sm text-gray-500 my-3">
											<span className="font-medium text-gray-700">
												{new Date(session.time).toLocaleString()}
											</span>
										</p>
									</div>
									<Separator />
									<div className="mt-2 pt-4">
										<p className="font-semibold text-gray-700">
											Number of seats:
										</p>
										<p className="text-sm text-gray-500 my-3">
											<span className="font-medium text-gray-700">
												{session.availableSeats}
											</span>
										</p>
									</div>
									<Separator />
								</CardContent>
								<CardFooter>
									<Button>Register Now!</Button>{" "}
									{/* Button to register for the session */}
								</CardFooter>
							</div>
						</Card>
					))
				)}
			</main>
		</>
	);
};

export default EventSessions;
