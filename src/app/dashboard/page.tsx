"use client";

import { useRouter } from "next/navigation";
import withAuth from "@/components/providers/AuthWrapper";
import { useAuth } from "@/components/providers/AuthProvider";
import { Event } from "@/lib/types/event";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import HeaderNav from "@/components/HeaderNav";

function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const { isAuthenticated, handleExpiredToken, getValidAccessToken } =
    useAuth();
  const userData = isAuthenticated
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : null;
  const router = useRouter();

  if (userData.role === "user") {
    router.push("/home");
    return null;
  }

  function handleSession(code: any) {
    return router.push(`/dashboard/${code}`);
  }
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    async function fetchEvents() {
      const accessToken = await getValidAccessToken();
      if (!accessToken) {
        handleExpiredToken();
        return;
      }

      setIsLoading(true); // Set loading to true before fetching

      try {
        const response = await fetch(`${API_BASE_URL}/api/v2/events`, {
          headers: {
            "X-API-KEY": API_KEY || "",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401) {
          handleExpiredToken();
          return;
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }

    fetchEvents();
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Adjust the width as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <HeaderNav name="Admin Dashboard" link="home"></HeaderNav>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Registration
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.code}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {event.availabilityStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {event.topics.join(", ")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatDate(event.registerStartAt)} -{" "}
                      {formatDate(event.registerEndAt)}
                    </TableCell>
                    <TableCell>
                      {(event.availabilityStatus === "available" ||
                        event.availabilityStatus === "soon" ||
                        event.availabilityStatus === "closed") && (
                        <Button onClick={() => handleSession(event.code)}>
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuth(EventsAdmin);
