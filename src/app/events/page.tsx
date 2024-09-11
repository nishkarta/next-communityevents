"use client";
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import { Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EVENT_EXAMPLE_IMAGE_URL =
	"https://static.wixstatic.com/media/271a07_29fe11ad76aa48fc975dadbeffb766c4~mv2.jpg/v1/fill/w_640,h_366,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/271a07_29fe11ad76aa48fc975dadbeffb766c4~mv2.jpg";

const EventsPage = () => {
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
				<Separator></Separator>
				<div className="my-4 mx-2 p-3">
					<Card className="rounded-xl ">
						<div className="flex flex-col md:flex-row">
							{/* Left Half / Top Half : Image */}
							<div className="md:w-1/2 relative h-48 md:h-auto">
								<Image
									src={EVENT_EXAMPLE_IMAGE_URL} // Replace with the actual image URL or import path
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
									<CardTitle>Home Base 2024</CardTitle> {/* Event name */}
								</CardHeader>
								<CardContent className="flex flex-col">
									<Badge className="w-14 bg-green-700 text-center mb-2">
										Active
									</Badge>
									<p className="text-base font-light my-2 pb-2">
										{/* Event description */}
										Join us for this year&apos;s Home Base event! Lorem ipsum,
										dolor sit amet consectetur adipisicing elit. In harum quae
										ab, alias eos corrupti?
									</p>
									<div className="border-t border-gray-200 mt-2 pt-4">
										<p className="font-semibold text-gray-700">
											Registration Times:
										</p>
										<div className="flex flex-col">
											<p className="text-sm text-gray-500 my-3">
												<span className="font-medium text-gray-700">
													Open : Sunday, 15/09/2024, 10:00 AM
												</span>
												{/* Open registration */}
											</p>
											<p className="text-sm text-gray-500">
												<span className="font-medium text-gray-700">
													Closed : Sunday, 22/09/2024, 10:00 AM
												</span>
												{/* Closed registration */}
											</p>
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<Button>Register Now!</Button>{" "}
									{/* Link to event sessions page */}
								</CardFooter>
							</div>
						</div>
					</Card>
				</div>
			</main>
		</>
	);
};

export default EventsPage;
