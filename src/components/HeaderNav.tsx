"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const HeaderNav = ({ name }: { name: string }) => {
	const router = useRouter();
	return (
		<>
			<header className="relative flex items-center border border-b-2 border-b-black/60 bg-white p-5">
				<div className="absolute left-1">
					<Link href="/home">
						<ChevronLeft className="w-7 h-7 md:mb-0 md:hover:text-primary-light" />
					</Link>
				</div>
				<div className="w-full text-center">{name}</div>
			</header>
		</>
	);
};

export default HeaderNav;
