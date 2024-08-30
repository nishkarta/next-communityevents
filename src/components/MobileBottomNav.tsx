"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { House, Users, Church, Settings } from "lucide-react";

const MobileBottomNav = () => {
	const pathname = usePathname();
	const excludedRoutes = ["/", "/login", "/register"];
	const shouldShowNav = !excludedRoutes.includes(pathname);

	if (!shouldShowNav) {
		return null; // Do not render the component if the route is excluded
	}

	return (
		<nav className='fixed bottom-0 w-full bg-white shadow-lg md:hidden'>
			<ul className='flex justify-around p-4'>
				<li className='text-center cursor-pointer'>
					<House className='mx-auto' />
					Home
				</li>
				<li className='text-center cursor-pointer'>
					<Users className='mx-auto' />
					Community
				</li>
				<li className='text-center cursor-pointer'>
					<Church className='mx-auto' />
					Ministry
				</li>
				<li className='text-center cursor-pointer'>
					<Settings className='mx-auto' />
					Settings
				</li>
			</ul>
		</nav>
	);
};

export default MobileBottomNav;
