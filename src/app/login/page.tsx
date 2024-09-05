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

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});
type FormValues = z.infer<typeof formSchema>;
export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	// Initialize the form with react-hook-form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		// Handle form submission
		console.log(data);
	};
	return (
		<>
			<div className='p-4 sm:p-6 lg:p-8 md:flex md:flex-col md:items-center md:justify-center'>
				<div className='flex flex-row md:self-start'>
					<Link className='md:self-start' href='/'>
						<ChevronLeft className='mb-5 w-7 h-7 md:mb-0 md:hover:text-primary-light' />
					</Link>
					<span className='underline underline-offset-4 ml-1 mt-px text-md'>
						Back
					</span>
				</div>

				<h1 className='text-xl font-bold mb-4'>Sign In</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='md:w-1/3'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='my-6'>
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
							name='password'
							render={({ field }) => (
								<FormItem className='my-6'>
									<FormLabel>Password</FormLabel>
									<div className='relative'>
										<FormControl>
											<Input
												className='shadow-md mb-4 focus-visible:ring-primary-light'
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
										<Link href='#' className=' text-sm underline'>
											Forgot your password?
										</Link>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className=' my-8 w-full sm:w-auto'>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
