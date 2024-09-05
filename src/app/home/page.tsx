"use client";
import React from "react";
import { Ticket } from "lucide-react";

import Image from "next/image";

const Home = () => {
	const IMAGE_URL =
		"https://images.unsplash.com/photo-1555817128-342e1c8b3101?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	return (
		<>
			<main className=''>
				{/* Header */}
				<div className='flex flex-row border bg-primary border-x-primary border-t-primary border-b-black/20 p-3 justify-between items-center'>
					<span className='text-white'>Hello, Tobias!</span>
					<div className='flex flex-col items-center'>
						<Ticket className='md:w-8 md:h-8 text-white' />
					</div>
				</div>
				{/* Hero Banner */}
				<div className='relative w-screen h-[45vw] md:h-96'>
					<div className='-z-10'>
						<Image
							priority
							src={IMAGE_URL}
							fill={true}
							className='object-cover object-center'
							alt='hero image example'
						/>
					</div>
					<div className='relative flex flex-col items-center justify-center h-[45vw] md:h-96'>
						<h1 className='text-white text-4xl font-bold outline-black drop-shadow-sm'>
							Come and Join us!
						</h1>
						<p className='text-white italic font-normal outline-black drop-shadow-sm'>
							Register to your nearest COOL community now!
						</p>
					</div>
				</div>
				{/* Dashboard Icons */}
			</main>
		</>
	);
};

export default Home;
