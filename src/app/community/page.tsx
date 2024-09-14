"use client";
import React from "react";
import Image from "next/image";
import { MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

const COMMUNITY_IMAGE_URL =
	"https://growcommunity.church/wp-content/uploads/2024/08/GWP09302-photoaidcom-greyscale-scaled.jpg";

const Community = () => {
	return (
		<main className="bg-gray-50 min-h-screen flex flex-col items-center p-6">
			{/* Hero Banner */}
			<div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] mb-8">
				<Image
					src={COMMUNITY_IMAGE_URL}
					fill={true}
					className="object-cover object-center rounded-lg shadow-lg"
					alt="hero image example"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-lg"></div>
			</div>
			{/* Content */}
			<div className="max-w-3xl w-full text-center mb-8">
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
					Join our <span className="text-primary-light">COOL</span>
				</h1>
				<p className="text-lg md:text-xl font-normal text-gray-700 leading-relaxed mx-4">
					Our cell groups are the heart and soul of Grow Community Church! These
					communities are where amazing things happen, providing a space for
					fellowship, support, and spiritual growth. We have groups for all ages
					and stages of life. Find a group near you and become part of our
					vibrant community! Let’s grow together in faith and friendship!
				</p>
			</div>
			{/* Call to Action */}
			<div className="text-lg text-center mt-4 mb-24">
				<p className="text-gray-800 mb-4">Interested to learn more?</p>
				<Link
					href="https://api.whatsapp.com/send?phone=6281398812927&text=Halo,%20saya%20tertarik%20mendapatkan%20info%20mengenai%20COOL."
					className="inline-flex items-center px-4 py-2 text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark transition-colors"
				>
					<MessageCircleQuestion className="mr-2" />
					Message Us!
				</Link>
			</div>
		</main>
	);
};

export default Community;
