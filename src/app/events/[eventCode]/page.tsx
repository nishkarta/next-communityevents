import React from "react";
import HeaderNav from "@/components/HeaderNav";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EventSessions = ({ params }: { params: { eventCode: string } }) => {
	return (
		<>
			<HeaderNav name="Event Sessions" link="events" />
			<main></main>
			<div className="flex flex-col ml-7 my-4">
				{/*Event Name */}
				<span className="text-2xl font-bold">HOMEBASE 2024</span>
				<span className="text-sm font-normal mt-1">
					Sessions for event code : {params.eventCode}
				</span>
			</div>
			<Separator className="space-y-3 my-4"></Separator>
			<Card className="rounded-xl mx-2 my-5 ">
				<div className="flex flex-col">
					<div className="">
						<CardHeader>
							<CardTitle>Morning Session</CardTitle> {/* Session Name */}
							<CardDescription>Session 1</CardDescription> {/*Session Number */}
						</CardHeader>
						<CardContent className="flex flex-col">
							<Badge className="w-14 bg-green-700 text-center mb-2">
								Active
							</Badge>
							<p className="text-base font-light my-2 pb-2">
								{/* Event description */}
								The morning session for Homebase.
							</p>
							<Separator></Separator>
							<div className=" mt-2 pt-4">
								<p className="font-semibold text-gray-700">Event Time:</p>
								{/* Event time */}
								<p className="text-sm text-gray-500 my-3">
									<span className="font-medium text-gray-700">
										Sunday, 29/09/2024, 08:00 AM
									</span>
								</p>
							</div>
							<Separator></Separator>
							<div className=" mt-2 pt-4">
								<p className="font-semibold text-gray-700">Number of seats:</p>
								{/* Event seat number */}
								<p className="text-sm text-gray-500 my-3">
									<span className="font-medium text-gray-700">300</span>
								</p>
							</div>
							<Separator></Separator>
						</CardContent>
						<CardFooter>
							<Button>Register Now!</Button> {/* Link to event sessions page */}
						</CardFooter>
					</div>
				</div>
			</Card>
			<Card className="rounded-xl mx-2 mt-4 mb-20">
				<div className="flex flex-col">
					<div className="">
						<CardHeader>
							<CardTitle>Evening Session</CardTitle> {/* Session Name */}
							<CardDescription>Session 2</CardDescription> {/*Session Number */}
						</CardHeader>
						<CardContent className="flex flex-col">
							<Badge className="w-14 bg-green-700 text-center mb-2">
								Active
							</Badge>
							<p className="text-base font-light my-2 pb-2">
								{/* Event description */}
								The evening session for Homebase.
							</p>
							<Separator></Separator>
							<div className=" mt-2 pt-4">
								<p className="font-semibold text-gray-700">Event Time:</p>
								{/* Event time */}
								<p className="text-sm text-gray-500 my-3">
									<span className="font-medium text-gray-700">
										Sunday, 29/09/2024, 18:00 PM
									</span>
								</p>
							</div>
							<Separator></Separator>
							<div className=" mt-2 pt-4">
								<p className="font-semibold text-gray-700">Number of seats:</p>
								{/* Event seat number */}
								<p className="text-sm text-gray-500 my-3">
									<span className="font-medium text-gray-700">4000</span>
								</p>
							</div>
							<Separator></Separator>
						</CardContent>
						<CardFooter>
							<Button className="mb-5">Register Now!</Button>{" "}
							{/* Link to event sessions page */}
						</CardFooter>
					</div>
				</div>
			</Card>
		</>
	);
};

export default EventSessions;
