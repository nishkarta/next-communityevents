"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
	const ComponentWithAuth = (props: any) => {
		const { isAuthenticated, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			// Only redirect when not loading and the user is not authenticated
			if (!loading && typeof window !== "undefined" && !isAuthenticated) {
				router.replace("/");
			}
		}, [isAuthenticated, loading, router]);

		// Don't render the component while loading
		if (loading) {
			return <div>Loading...</div>; // You can show a spinner or loading UI here
		}

		if (!isAuthenticated) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	return ComponentWithAuth;
};

export default withAuth;
