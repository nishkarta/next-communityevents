"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const HeaderNav = ({ name, link }: { name: string; link: string }) => {
	const router = useRouter();
	return (
		<>
			<header className="relative w-full flex items-center border border-b-2 border-b-primary/60 bg-primary p-5">
				<div className="absolute left-1">
					<Link href={`/${link}`}>
						<ChevronLeft className="w-7 h-7 md:mb-0 text-white md:hover:text-primary-light" />
					</Link>
				</div>
				<div className="w-full text-center text-white">{name}</div>
			</header>
		</>
	);
};

export default HeaderNav;
