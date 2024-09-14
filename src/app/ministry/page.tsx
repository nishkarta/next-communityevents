import React from "react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const JAKARTA_IMAGE_URL =
	"https://growcommunity.church/wp-content/uploads/2024/08/GWP09162-photoaidcom-greyscale-1024x576.jpg";
const BEKASI_IMAGE_URL =
	"https://growcommunity.church/wp-content/uploads/2024/08/GWP02108-photoaidcom-greyscale-1024x683.jpg";
const MANADO_IMAGE_URL =
	"https://growcommunity.church/wp-content/uploads/2024/08/GWP02366-photoaidcom-greyscale-1024x683.jpg";

const Ministry = () => {
	return (
		<main className="p-4 bg-gray-100 min-h-screen">
			{/* Jakarta */}
			<Card className="rounded-xl shadow-lg bg-white mb-4 mx-3 overflow-hidden">
				<div className="flex flex-col md:flex-row">
					{/* Left Half / Top Half: Image */}
					<div className="relative h-48 md:h-72 w-full md:w-1/2">
						<Image
							src={JAKARTA_IMAGE_URL} // Use event's image or default
							alt="Jakarta Service Times Image"
							layout="fill"
							objectFit="cover"
							className="rounded-t-xl md:rounded-l-xl md:rounded-r-none"
							priority
						/>
					</div>

					<div className="p-4 md:w-1/2">
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-gray-800">
								GC Jakarta
							</CardTitle>
						</CardHeader>
						<Separator />
						<CardContent className="flex flex-col mt-2 space-y-3 text-gray-700">
							<span className="text-base">
								<span className="font-bold text-lg">Sunday Service</span>: 08:30
								| 10:30 | 13:00 | 16:00 | 18:00
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Youth</span>: 10:30
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Children</span>: 08:30
								| 10:30 | 13:00 | 16:00
							</span>
						</CardContent>
						<CardFooter className="p-4">
							{/* Add any footer content if needed */}
						</CardFooter>
					</div>
				</div>
			</Card>
			{/* Bekasi */}
			<Card className="rounded-xl shadow-lg bg-white mb-4 mx-3 overflow-hidden">
				<div className="flex flex-col md:flex-row">
					{/* Left Half / Top Half: Image */}
					<div className="relative h-48 md:h-72 w-full md:w-1/2">
						<Image
							src={BEKASI_IMAGE_URL} // Use event's image or default
							alt="Bekasi Service Times Image"
							layout="fill"
							objectFit="cover"
							className="rounded-t-xl md:rounded-l-xl md:rounded-r-none"
							priority
						/>
					</div>

					<div className="p-4 md:w-1/2">
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-gray-800">
								GC Bekasi
							</CardTitle>
						</CardHeader>
						<Separator />
						<CardContent className="flex flex-col mt-2 space-y-3 text-gray-700">
							<span className="text-base">
								<span className="font-bold text-lg">Sunday Service</span>: 09:00
								| 11:00
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Youth</span>: 09:00 |
								11:00
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Children</span>: 09:00
								| 11:00
							</span>
						</CardContent>
						<CardFooter className="p-4">
							{/* Add any footer content if needed */}
						</CardFooter>
					</div>
				</div>
			</Card>
			{/* Manado */}
			<Card className="rounded-xl shadow-lg bg-white mb-4 mx-3 overflow-hidden">
				<div className="flex flex-col md:flex-row">
					<div className="relative h-48 md:h-72 w-full md:w-1/2">
						<Image
							src={MANADO_IMAGE_URL} // Use event's image or default
							alt="Manado Service Times Image"
							layout="fill"
							objectFit="cover"
							className="rounded-t-xl md:rounded-l-xl md:rounded-r-none"
							priority
						/>
					</div>

					<div className="p-4 md:w-1/2">
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-gray-800">
								GC Manado
							</CardTitle>
						</CardHeader>
						<Separator />
						<CardContent className="flex flex-col mt-2 space-y-3 text-gray-700">
							<span className="text-base">
								<span className="font-bold text-lg">Sunday Service</span>: 10:30
								| 17:00 (WITA)
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Children</span>: 10:30
								| 17:00 (WITA)
							</span>
						</CardContent>
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-gray-800">
								Minahasa Utara
							</CardTitle>
						</CardHeader>
						<Separator />
						<CardContent className="flex flex-col mt-2 space-y-3 text-gray-700">
							<span className="text-base">
								<span className="font-bold text-lg">Sunday Service</span>: 08:30
								(WITA)
							</span>
							<span className="text-base">
								<span className="font-bold text-lg">Grow Children</span>: 08:30
								(WITA)
							</span>
						</CardContent>
						<CardFooter className="p-4">
							{/* Add any footer content if needed */}
						</CardFooter>
					</div>
				</div>
			</Card>
		</main>
	);
};

export default Ministry;
