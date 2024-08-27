"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	return (
		<main className='flex h-screen flex-col justify-start md:justify-between items-center bg-primary'>
			{/* Logo Section */}
			<div className='my-40 md:mt-28'>
				<Image
					src='/images/gc-logo.jpg' // Adjust the path to your logo in the public folder
					alt='Logo'
					width={150} // Adjust the width of the logo
					height={150} // Adjust the height of the logo
				/>
			</div>

			{/* Buttons Section */}
			<div className='flex flex-col items-center gap-10 mb-20 w-full'>
				<Button
					onClick={() => router.push("/login")}
					className='bg-white text-primary hover:bg-gray-300 hover:text-black hover:border-primary w-10/12 md:w-1/3 border-2 border-white rounded-full'
				>
					Sign In
				</Button>
				<Button
					onClick={() => router.push("/register")}
					className='bg-transparent text-white hover:bg-white hover:text-black hover:border-primary w-10/12 md:w-1/3 border-2 border-white rounded-full'
				>
					Sign Up Now!
				</Button>
			</div>
		</main>
	);
}
