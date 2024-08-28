"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const phoneRegex = new RegExp(
	"^\\+?(\\d{1,3})?[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}$"
);

const formSchema = z
	.object({
		fullname: z.string().min(2, {
			message: "Input your proper full name.",
		}),
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		phonenumber: z
			.string()
			.regex(phoneRegex, { message: "Invalid phone number format!" }),
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
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	// Initialize the form with react-hook-form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullname: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		// Handle form submission
		console.log(data);
	};

	return (
		<div className='p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center'>
			<Link className='md:self-start' href='/'>
				<ChevronLeft className='mb-5 w-7 h-7 md:mb-0 md:hover:text-primary-light' />
			</Link>
			<h1 className='text-xl font-bold mb-4'>Register</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-9 md:w-1/3'
				>
					<FormField
						control={form.control}
						name='fullname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										className='shadow-md focus-visible:ring-primary-light'
										placeholder='Enter your full name.'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className='shadow-md  focus-visible:ring-primary-light'
										placeholder='Enter your email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phonenumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input
										className='shadow-md focus-visible:ring-primary-light'
										placeholder='Enter your phone number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<div className='relative'>
									<FormControl>
										<Input
											className='shadow-md focus-visible:ring-primary-light'
											type={showPassword ? "text" : "password"}
											placeholder='Enter your password'
											{...field}
										/>
									</FormControl>
									{showPassword ? (
										<EyeOff
											className='absolute right-2 top-2 cursor-pointer text-gray-500'
											onClick={() => setShowPassword(!showPassword)}
										/>
									) : (
										<Eye
											className='absolute right-2 top-2 cursor-pointer text-gray-500'
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
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<div className='relative'>
									<FormControl>
										<Input
											className='shadow-md focus-visible:ring-primary-light'
											type={showConfirmPassword ? "text" : "password"}
											placeholder='Confirm your password'
											{...field}
										/>
									</FormControl>
									{showConfirmPassword ? (
										<EyeOff
											className='absolute right-2 top-2 cursor-pointer text-gray-500'
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										/>
									) : (
										<Eye
											className='absolute right-2 top-2 cursor-pointer text-gray-500'
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

					<Button type='submit' className='w-full sm:w-auto'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
