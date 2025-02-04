"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/components/providers/AuthProvider";
import withAuth from "@/components/providers/AuthWrapper";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

const EventSessions = () => {
  const { eventCode } = useParams(); // Retrieve eventCode from the route params
  const [sessions, setSessions] = useState<any[]>([]); // State to hold sessions
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for errors
  const { isAuthenticated, handleExpiredToken } = useAuth();
  const userData = isAuthenticated
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : null;
  const router = useRouter();

  // Fetch sessions when the component mounts or when eventCode changes
  useEffect(() => {
    async function fetchSessions() {
      if (!userData.token || !eventCode) return;
      setIsLoading(true); // Set loading state
      setError(null); // Reset error state

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/events/${eventCode}/sessions`,
          {
            headers: {
              "X-API-KEY": API_KEY || "",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        if (response.status === 401) {
          handleExpiredToken();
          return;
        }
        if (response.status === 404) {
          setSessions([]);
          return;
        }

        const data = await response.json();
        console.log(data);
        console.log(data.data);
        setSessions(data.data); // Update sessions state
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading state
      }
    }

    fetchSessions();
  }, [eventCode]);

  function handleRegistration(
    eventCode: string | string[],
    sessionCode: string
  ) {
    return router.push(`/events/${eventCode}/${sessionCode}/registration`);
  }

  return (
    <>
      <HeaderNav name="Event Sessions" link="events" />
      <main>
        {/* Loading and Error States */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sessions.length === 0 ? (
          <p className="text-center">No sessions available for this event.</p>
        ) : (
          // Display fetched sessions
          sessions.map((session) => (
            <Card
              key={session.id}
              className="rounded-xl mx-2 my-5 md:w-1/2 md:mx-auto"
            >
              <div className="flex flex-col">
                <CardHeader>
                  <CardTitle>{session.name}</CardTitle> {/* Session Name */}
                  {/* Session Number */}
                </CardHeader>
                <CardContent className="flex flex-col">
                  <Badge
                    className={`flex w-14 p-2 text-center justify-center items-center mb-2 ${
                      session.status === "active"
                        ? "bg-green-700"
                        : session.status === "closed"
                        ? "bg-red-500"
                        : "bg-gray-400" // Default color for other statuses
                    }`}
                  >
                    <span className="mx-auto">{session.status}</span>
                  </Badge>
                  <p className="text-base font-light my-2 pb-2">
                    {session.description}
                  </p>
                  <Separator />
                  <div className="mt-2 pt-4">
                    <p className="font-semibold text-gray-700">Event Time:</p>
                    <p className="text-sm text-gray-500 my-3">
                      <span className="font-medium text-gray-700">
                        {formatDate(new Date(session.time))}
                      </span>
                    </p>
                  </div>

                  <Separator />
                  <div className="mt-2 pt-4">
                    <p className="font-semibold text-gray-700">
                      Number of seats:
                    </p>
                    <p className="text-sm text-gray-500 my-3">
                      <span className="font-medium text-gray-700">
                        {session.availableSeats}
                      </span>
                    </p>
                  </div>
                  <Separator />
                </CardContent>
                <CardFooter>
                  {/* Link to register sessions page */}
                  {session.status === "active" ? (
                    <Button
                      onClick={() =>
                        handleRegistration(eventCode, session.code)
                      }
                    >
                      Register Now!
                    </Button>
                  ) : (
                    <Button disabled>Registration Closed</Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))
        )}
      </main>
    </>
  );
};

export default withAuth(EventSessions);
