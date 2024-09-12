"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const EventsPage = () => {
	const [events, setEvents] = useState<any[]>([]); // State to hold fetched events
	const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
	const EVENT_EXAMPLE_IMAGE_URL =
		"https://static.wixstatic.com/media/271a07_29fe11ad76aa48fc975dadbeffb766c4~mv2.jpg/v1/fill/w_640,h_366,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/271a07_29fe11ad76aa48fc975dadbeffb766c4~mv2.jpg";
	const router = useRouter();
	// Fetch events on component mount
	useEffect(() => {
		async function fetchEvents() {
			const userData = JSON.parse(localStorage.getItem("userData") || "{}");

			if (!userData.token) return;

			try {
				setIsLoading(true); // Set loading state

				const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
					headers: {
						"X-API-KEY": API_KEY,
						"Content-Type": "application/json",
						Authorization: `Bearer ${userData.token}`, // Include token in Authorization header
					},
				});

				if (!response.ok) {
					if (response.status === 401) {
						console.error("Unauthorized - Token expired or invalid");
						return;
					}
					throw new Error("Failed to fetch events");
				}

				const data = await response.json();

				setEvents(data.data); // Store events data
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setIsLoading(false); // Stop loading state
			}
		}

		fetchEvents();
	}, []);

	function handleSession(code: string) {
		return router.push(`/events/${code}`);
	}

	return (
		<>
			<HeaderNav name="Events" link="home"></HeaderNav>
			<main>
				<div className="my-4 mx-2 flex relative flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search an event"
						className="w-full justify-center rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				<Separator />
				<div className="my-4 mx-2 p-3">
					{isLoading ? (
						<p>
							<LoadingSpinner />
						</p>
					) : events.length > 0 ? (
						events.map((event) => (
							<Card key={event.id} className="rounded-xl mb-4">
								<div className="flex flex-col md:flex-row">
									{/* Left Half / Top Half : Image */}
									<div className="md:w-1/2 relative h-48 md:h-auto">
										<Image
											src={EVENT_EXAMPLE_IMAGE_URL} // Use event's image or default
											alt="Event Image"
											layout="fill"
											objectFit="cover"
											className="rounded-t-xl rounded-b-none"
											priority
										/>
									</div>
									{/* Right Half / Bottom Half: Event Information */}
									<div className="md:w-1/2">
										<CardHeader>
											<CardTitle>{event.name}</CardTitle> {/* Event name */}
										</CardHeader>
										<CardContent className="flex flex-col">
											<Badge className="w-14 bg-green-700 text-center mb-2">
												{event.status}
											</Badge>
											<p className="text-base font-light my-2 pb-2">
												{event.description}
											</p>
											<div className="border-t border-gray-200 mt-2 pt-4">
												<p className="font-semibold text-gray-700">
													Registration Times:
												</p>
												<div className="flex flex-col">
													<p className="text-sm text-gray-500 my-3">
														<span className="font-medium text-gray-700">
															Open:{" "}
															{new Date(
																event.openRegistration
															).toLocaleString()}
														</span>
													</p>
													<p className="text-sm text-gray-500">
														<span className="font-medium text-gray-700">
															Closed:{" "}
															{new Date(
																event.closedRegistration
															).toLocaleString()}
														</span>
													</p>
												</div>
											</div>
										</CardContent>
										<CardFooter>
											<Button
												onClick={() => {
													handleSession(event.code);
												}}
											>
												Register Now!
											</Button>
											{/* Link to event sessions page */}
										</CardFooter>
									</div>
								</div>
							</Card>
						))
					) : (
						<p>No events found.</p>
					)}
				</div>
			</main>
		</>
	);
};

export default EventsPage;
