/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "static.wixstatic.com",
				port: "",
			},
		],
	},
};

export default nextConfig;
