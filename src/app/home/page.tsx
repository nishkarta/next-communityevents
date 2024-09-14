"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { QrCode } from "lucide-react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import IconButton from "@/components/IconButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import withAuth from "@/components/providers/AuthWrapper";

import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
	const router = useRouter();
	const IMAGE_URL =
		"https://images.unsplash.com/photo-1555817128-342e1c8b3101?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	const { isAuthenticated, logout, handleExpiredToken } = useAuth();
	const handleLogout = () => {
		logout();
		router.push("/");
	};
	const userData = isAuthenticated
		? JSON.parse(localStorage.getItem("userData") || "{}")
		: null;
	const [registrations, setRegistrations] = useState<any>({});
	const fetchRegistrations = async () => {
		if (!userData?.token) return;

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
		}
	};

	useEffect(() => {
		fetchRegistrations();
	}, []);

	return (
		<>
			<main className="h-max overflow-auto">
				{/* Header */}
				<div className="flex flex-row border bg-primary border-x-primary border-t-primary border-b-black/20 p-2 justify-between items-center">
					<Image
						className=""
						src="/images/gc-logo.jpg" // Adjust the path to your logo in the public folder
						alt="Logo"
						width={60} // Adjust the width of the logo
						height={60} // Adjust the height of the logo
					/>
					<div className="flex flex-row gap-x-3 items-center">
						<Button onClick={handleLogout}>
							<span className="text-white text-sm mr-5">Sign Out</span>
							<LogOut className="md:w-8 md:h-8 mr-2 text-white" />
						</Button>
					</div>
				</div>
				<div className="flex flex-row  bg-white  p-8 justify-between items-center">
					<span className="text-black text-base font-bold">
						Hi, {userData?.name}!
					</span>
				</div>
				{/* Hero Banner */}
				<div className="relative w-screen h-[45vw] md:h-96">
					<div className="-z-10">
						<Image
							priority
							src={IMAGE_URL}
							fill={true}
							className="object-cover object-center"
							alt="hero image example"
						/>
					</div>
					<div className="relative flex flex-col items-center justify-center h-[45vw] md:h-96">
						<h1 className="text-white text-4xl font-bold outline-black drop-shadow-sm">
							Come and Join us!
						</h1>
						<p className="text-white italic font-normal outline-black drop-shadow-sm">
							Register to your nearest COOL community now!
						</p>
					</div>
				</div>
				{/* Dashboard Icons */}
				<div className="mt-8 flex justify-center">
					<div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-auto-fill-md lg:grid-cols-auto-fill-lg gap-3 md:gap-6 p-3 justify-items-center w-full">
						<IconButton
							href="/events"
							iconName="fi fi-tr-calendar-star"
							name="Events"
							iconColor="text-sky-500"
						/>
						<IconButton
							href="https://form.jotform.com/DigitalExcom/prayer-form"
							iconName="fi fi-tr-praying-hands"
							name="Prayer and Grateful Form"
							iconColor="text-amber-600"
						/>
						<IconButton
							href="https://growcommunity.church/index.php/give/"
							iconName="fi fi-tr-hands-heart"
							name="Giving"
							iconColor="text-rose-400"
						/>
						<IconButton
							href="https://www.youtube.com/c/GrowCenterChurch"
							iconName="fi fi-brands-youtube"
							name="Sermons"
							iconColor="text-red-600"
						/>
						<IconButton
							href="https://open.spotify.com/show/3Uawgjvfdw3KnHTlrl5GLJ?si=890c04f909654e1c&nd=1&dlsi=e04e2d46b9084aa5"
							iconName="fi fi-brands-spotify"
							name="Grow in Words"
							iconColor="text-green-500"
						/>

						{/* {[1, 2].map((num) => (
						<Button key={num} variant="outline" className="h-20">
							Button {num}
						</Button>
					))} */}
					</div>
				</div>
				{/* Upcoming Events */}
				<div className="mt-4 p-3 mb-20">
					<Card className="p-4 md:w-1/2 md:mx-auto">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="font-medium mb-2">Your upcoming event</h3>
								<p className="text-sm text-muted-foreground">
									You currently have no registrations.
								</p>
							</div>
							<ChevronRight className="h-8 w-8"> </ChevronRight>
						</div>
					</Card>
				</div>
			</main>
		</>
	);
};

export default withAuth(Home);
