"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import HeaderNav from "@/components/HeaderNav";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/components/providers/AuthProvider";
import withAuth from "@/components/providers/AuthWrapper";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const EventRegistration = () => {
	const { eventCode, sessionCode } = useParams();
	const [numberOfRegistrants, setNumberOfRegistrants] = useState<number>(1);
	const [confirmed, setConfirmed] = useState<boolean>(false);
	const [identifier, setIdentifier] = useState<string>(""); // New state for identifier
	const [registrantData, setRegistrantData] = useState<
		{
			name: string;
			address: string;
		}[]
	>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const { isAuthenticated, handleExpiredToken } = useAuth();
	const userData = isAuthenticated
		? JSON.parse(localStorage.getItem("userData") || "{}")
		: null;
	const router = useRouter();
	const { toast } = useToast();

	const [errors, setErrors] = useState<string[][]>([]); // Track errors for each registrant

	const incrementRegistrants = () => {
		if (numberOfRegistrants <= 3) {
			setNumberOfRegistrants((prev) => prev + 1);
		}
	};

	const decrementRegistrants = () => {
		if (numberOfRegistrants > 1) {
			setNumberOfRegistrants((prev) => prev - 1);
		}
	};

	const handleConfirm = () => {
		setConfirmed(true);
		const newRegistrantData = Array.from(
			{ length: numberOfRegistrants },
			(_, index) => ({
				name: registrantData[index]?.name || "",
				address: registrantData[index]?.address || "",
			})
		);
		setRegistrantData(newRegistrantData);
		setErrors(new Array(numberOfRegistrants).fill(["", ""])); // Reset errors for all fields
	};

	const handleInputChange = (index: number, field: string, value: string) => {
		if (field === "identifier") {
			setIdentifier(value);
			return;
		}

		const updatedRegistrantData = registrantData.map((data, i) =>
			i === index ? { ...data, [field]: value } : data
		);
		setRegistrantData(updatedRegistrantData);

		// Validate input in real-time for the 'address' field
		if (field === "address") {
			const addressError =
				value.length < 15 ? "Address must be at least 15 characters." : "";
			const updatedErrors = errors.map((error, i) =>
				i === index ? [error[0], addressError] : error
			);
			setErrors(updatedErrors);
		}

		// Clear error for the 'name' field if the user is typing in the name
		if (field === "name") {
			const updatedErrors = errors.map((error, i) =>
				i === index ? ["", error[1]] : error
			);
			setErrors(updatedErrors);
		}
	};

	const handleDeleteRegistrant = (index: number) => {
		const updatedRegistrantData = registrantData.filter((_, i) => i !== index);
		const updatedErrors = errors.filter((_, i) => i !== index);
		setRegistrantData(updatedRegistrantData);
		setErrors(updatedErrors);
		if (numberOfRegistrants === 1) {
			handleReset();
		} else {
			setNumberOfRegistrants((prev) => prev - 1);
		}
	};

	const validateForm = () => {
		let isValid = true;
		const updatedErrors = registrantData.map((registrant) => {
			const nameError = registrant.name === "" ? "Name is required." : "";
			const addressError =
				registrant.address.length < 15
					? "Address must be at least 15 characters."
					: "";
			if (nameError || addressError) isValid = false;
			return [nameError, addressError];
		});
		setErrors(updatedErrors);
		return isValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Validate form before submission
		if (!validateForm()) {
			console.log("Form contains errors.");
			setIsSubmitting(false);
			return;
		}

		const token = userData?.token;

		const payload = {
			name: registrantData[0]?.name.trim(), // Assuming identifier is used for the name here
			identifier: identifier.trim(),
			address: registrantData[0]?.address.trim(), // Assuming the first registrant's address
			eventCode: eventCode, // Use the event code from the params
			sessionCode: sessionCode, // Use the session code from the params
			otherRegister: registrantData.slice(1).map((input) => ({
				name: input.name.trim(),
				address: input.address.trim(),
			})),
		};

		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/events/registration`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						"X-API-Key": API_KEY,
					},
					body: JSON.stringify(payload),
				}
			);

			if (response.ok) {
				console.log(payload);
				toast({
					title: "Registration Successful",
					description: `You have successfully registered for the event! Redirecting to home page....`,
					className: "bg-green-400",
					duration: 3000,
				});

				// Redirect to home page after a delay
				setTimeout(() => {
					router.push("/home");
				}, 3000); // Adjust the delay as needed (3000ms = 3 seconds)
			} else {
				if (response.status === 401) {
					handleExpiredToken();
					return; // Exit function after handling expired token
				}
				// Handle other statuses or errors if needed
			}
		} catch (error) {
			console.error("An error occurred:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReset = () => {
		setNumberOfRegistrants(1);
		setConfirmed(false);
		setRegistrantData([]);
		setErrors([]);
		setIdentifier(""); // Reset identifier
	};

	return (
		<>
			<HeaderNav name="Register" link={`events/${eventCode}`} />
			<main className="my-4">
				{!confirmed && (
					<div className="flex flex-col items-center space-y-10">
						<label className="text-lg font-semibold text-gray-700">
							Select Number of Registrants
						</label>
						<div className="flex items-center justify-center gap-x-8 my-4">
							<Button
								className="w-10 h-10 bg-primary-light hover:bg-primary-light/70 text-white font-bold transition duration-150 ease-in-out focus:outline-none focus:bg-primary"
								onClick={decrementRegistrants}
							>
								<span className="text-xl">-</span>
							</Button>
							<span className="text-xl font-medium text-gray-900 w-12 text-center">
								{numberOfRegistrants}
							</span>
							<Button
								className="w-10 h-10 bg-primary-light hover:bg-primary-light/70 text-white font-bold transition duration-150 ease-in-out focus:outline-none focus:bg-primary"
								onClick={incrementRegistrants}
							>
								<span className="text-xl md:text-2xl">+</span>
							</Button>
						</div>
						<Button
							onClick={handleConfirm}
							className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
						>
							Confirm
						</Button>
					</div>
				)}

				{confirmed && (
					<>
						<form onSubmit={handleSubmit} className="m-4">
							<Card className="my-4 relative md:w-5/12 md:mx-auto">
								<CardHeader>
									<CardTitle>Identifier</CardTitle>
									<CardDescription>
										Please fill with your email address or phone number.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-6">
										<Input
											type="text"
											id="identifier"
											value={identifier}
											className="shadow-md focus-visible:ring-primary-light"
											onChange={(e) =>
												handleInputChange(-1, "identifier", e.target.value)
											}
											required
										/>
									</div>
								</CardContent>
								<CardFooter></CardFooter>
							</Card>

							{registrantData.map((registrant, index) => (
								<Card
									key={index}
									className="my-4 relative md:w-5/12 md:mx-auto"
								>
									<CardHeader>
										<CardTitle>
											<div className="flex flex-row items-center justify-between">
												<h1>Registrant {index + 1}</h1>
												<Button
													onClick={() => handleDeleteRegistrant(index)}
													className="bg-red-500 text-white p-2 rounded mt-4 w-9 h-9"
												>
													<UserMinus />
												</Button>
											</div>
										</CardTitle>
										<CardDescription>
											Please fill out the details below:
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="mb-6">
											<label htmlFor={`name-${index}`} className="block mb-1">
												Full Name
											</label>
											<Input
												type="text"
												id={`name-${index}`}
												value={registrant.name}
												className="shadow-md focus-visible:ring-primary-light"
												onChange={(e) =>
													handleInputChange(index, "name", e.target.value)
												}
												required
											/>
											{errors[index]?.[0] && (
												<p className="text-red-500 mt-1 text-sm">
													{errors[index][0]}
												</p>
											)}
										</div>
										<div className="mb-2">
											<label
												htmlFor={`address-${index}`}
												className="block mb-1"
											>
												Address
											</label>
											<Input
												type="text"
												id={`address-${index}`}
												value={registrant.address}
												className="shadow-md focus-visible:ring-primary-light"
												onChange={(e) =>
													handleInputChange(index, "address", e.target.value)
												}
												required
											/>
											{errors[index]?.[1] && (
												<p className="text-red-500 mt-1 text-sm">
													{errors[index][1]}
												</p>
											)}
										</div>
									</CardContent>
									<CardFooter></CardFooter>
								</Card>
							))}
						</form>
						<Button
							onClick={handleSubmit}
							className="bg-blue-500 text-white ml-5"
						>
							Submit Registration
						</Button>
						<Button
							type="button"
							onClick={handleReset}
							className="bg-red-500 text-white p-2 rounded mt-4 w-20 mx-5"
						>
							Reset
						</Button>
					</>
				)}
			</main>
		</>
	);
};

export default withAuth(EventRegistration);
