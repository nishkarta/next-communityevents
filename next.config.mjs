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
			{
				protocol: "https",
				hostname: "growcommunity.church",
				port: "",
			},
		],
	},
};

export default nextConfig;
