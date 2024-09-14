"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

const formSchema = z.object({
	identifier: z.string({
		message: "Please enter a valid identifier.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});
type FormValues = z.infer<typeof formSchema>;
export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const { toast } = useToast();
	const router = useRouter();
	const { login } = useAuth();
	// Initialize the form with react-hook-form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	async function onSubmit(data: FormValues) {
		setLoading(true);
		data.identifier = data.identifier.trim().replace(/\s+/g, "").toLowerCase();
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/event/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-Key": API_KEY || "",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const result = await response.json();
				login(result);
				toast({
					title: "Log In Successful",
					description: `Redirecting to the home page...`,
					className: "bg-green-400",
					duration: 1500,
				});

				// Redirect to home page after a delay
				setTimeout(() => {
					router.push("/home");
				}, 1000);
			} else {
				const errorResult = await response.json();
				toast({
					title: "Log In Failed!",
					description: `Error : ${errorResult.message} `,
					className: "bg-red-400",
					duration: 1000,
				});
				throw errorResult;
			}
		} catch (error) {
			console.error("An error occurred:", error);
		} finally {
			setLoading(false);
		}
	}
	return (
		<>
			<div className="p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center">
				<div className="flex flex-row md:self-start">
					<Link className="md:self-start" href="/">
						<ChevronLeft className="mb-5 w-7 h-7 md:mb-0 md:hover:text-primary-light" />
					</Link>
					{/* <span className="underline underline-offset-4 ml-1 mt-px text-md">
						Back
					</span> */}
				</div>

				<h1 className="text-xl font-bold mb-4">Sign In</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/3">
						<FormField
							control={form.control}
							name="identifier"
							render={({ field }) => (
								<FormItem className="my-6">
									<FormLabel>Identifier</FormLabel>
									<FormControl>
										<Input
											className="shadow-md  focus-visible:ring-primary-light"
											placeholder="Enter your email or phone number"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{" "}
										Phone number format : 087800001234
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<span className="text-xs font-bold italic"></span>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="my-6">
									<FormLabel>Password</FormLabel>
									<div className="relative">
										<FormControl>
											<Input
												className="shadow-md mb-4 focus-visible:ring-primary-light"
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
										<Link href="/forget" className=" text-sm underline">
											Forgot your password?
										</Link>
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
		</>
	);
}
