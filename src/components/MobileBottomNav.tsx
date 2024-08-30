"use client";
import React from "react";
import { usePathname } from "next/navigation";

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
				<li className='text-center cursor-pointer'>Home</li>
				<li className='text-center cursor-pointer'>Search</li>
				<li className='text-center cursor-pointer'>Profile</li>
			</ul>
		</nav>
	);
};

export default MobileBottomNav;
