"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form schema with validation
const formSchema = z
	.object({
		name: z.string().min(2, {
			message: "Input your proper full name.",
		}),
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		phoneNumber: z
			.string()
			.regex(/^\+62/, {
				message:
					"Sorry! Phone numbers temporarily can only be with Indonesian format only (+62)",
			})
			.refine(isValidPhoneNumber, { message: "Invalid phone number" }),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Confirm Password must be at least 6 characters.",
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
	const router = useRouter();
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	// Initialize the form with react-hook-form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	// Handle form submission
	async function onSubmit(data: FormValues) {
		setLoading(true);
		data.email = data.email.trim().replace(/\s+/g, "").toLowerCase();
		data.phoneNumber = data.phoneNumber
			.trim()
			.replace(/\s+/g, "")
			.replace("+62", "0");
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/event/user/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-API-Key": API_KEY || "",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				toast({
					title: "Sign up Successful!",
					description: `Redirecting to the log in page...`,
					className: "bg-green-400",
					duration: 1500,
				});

				// Redirect to home page after a delay
				setTimeout(() => {
					router.push("/login");
				}, 1000);
			} else {
				const errorResult = await response.json();
				if (errorResult.status === "ALREADY_EXISTS") {
					toast({
						title: "Log In Failed!",
						description: `Error : User with your email/phone number already exists. Please log in! `,
						className: "bg-red-400",
						duration: 3000,
					});
				} else {
					toast({
						title: "Log In Failed!",
						description: `Error : ${errorResult.message} `,
						className: "bg-red-400",
						duration: 3000,
					});
				}
				throw errorResult;
			}
		} catch (error) {
			console.error("An error occurred:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center">
			<Link className="md:self-start" href="/">
				<ChevronLeft className="mb-5 w-7 h-7 md:mb-0 md:hover:text-primary-light" />
			</Link>
			<h1 className="text-xl font-bold mb-4">Register</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="md:space-y-6 md:w-1/3"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										className="shadow-md focus-visible:ring-primary-light"
										placeholder="Enter your full name."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className="shadow-md  focus-visible:ring-primary-light"
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<PhoneInput
										defaultCountry="ID"
										placeholder="Enter a phone number"
										international
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>Password</FormLabel>
								<div className="relative">
									<FormControl>
										<Input
											className="shadow-md focus-visible:ring-primary-light"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									{showPassword ? (
										<EyeOff
											className="absolute right-2 top-2 cursor-pointer text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
										/>
									) : (
										<Eye
											className="absolute right-2 top-2 cursor-pointer text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
										/>
									)}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem className="my-5">
								<FormLabel>Confirm Password</FormLabel>
								<div className="relative">
									<FormControl>
										<Input
											className="shadow-md focus-visible:ring-primary-light"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm your password"
											{...field}
										/>
									</FormControl>
									{showConfirmPassword ? (
										<EyeOff
											className="absolute right-2 top-2 cursor-pointer text-gray-500"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										/>
									) : (
										<Eye
											className="absolute right-2 top-2 cursor-pointer text-gray-500"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										/>
									)}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="my-8 w-full sm:w-auto"
						disabled={loading} // Disable button while loading
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</>
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
