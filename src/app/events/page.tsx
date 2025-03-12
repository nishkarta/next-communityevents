"use client";
import React, { useEffect, useMemo, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import withAuth from "@/components/providers/AuthWrapper";
import { useAuth } from "@/components/providers/AuthProvider";
import { capitalizedFirstLetter, formatDate } from "@/lib/utils";
import { Carousel } from "flowbite-react";


const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]); // State to hold fetched events
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const EVENT_EXAMPLE_IMAGE_URL =
    "https://utfs.io/f/OiRxrZt1JqQ4CQoHxw3RfX59ZPjs6OUdGVqBiH0rFAY34Ltm";
  const EVENT_PLACEHOLDER_URL =
    "https://placehold.co/600x400.png?text=Unavailable";
  const router = useRouter();
  const { isAuthenticated, handleExpiredToken, getValidAccessToken } =
    useAuth();

  // Fetch events on component mount
  useEffect(() => {
    async function fetchEvents() {
      const accessToken = await getValidAccessToken();
      if (!accessToken) {
        handleExpiredToken();
        return;
      }

      try {
        setIsLoading(true); // Set loading state

        const response = await fetch(`${API_BASE_URL}/api/v2/events`, {
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            handleExpiredToken();
            console.error("Unauthorized - Token expired or invalid");
            return;
          }
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data.data); // Store events data
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false); // Stop loading state
      }
    }

    fetchEvents();
  }, [getValidAccessToken, handleExpiredToken]);

  function handleSession(code: string) {
    return router.push(`/events/${code}`);
  }

  return (
    <>
      <HeaderNav name="Events" link="home"></HeaderNav>
      <main>
        <div className="my-4 mx-4 flex relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search an event"
            className="w-full justify-center rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <Separator />
        <div className="my-4 mx-2 py-2 px-2 flex flex-col gap-4 md:px-8">
          {isLoading ? (
            <p>
              <LoadingSpinner />
            </p>
          ) : events && events.length > 0 ? (
            events.map((event) => (
              <Card key={event.code} className="rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Left Half / Top Half: Image */}
                  <div className="relative md:w-2/3 aspect-[16/9]
                    overflow-hidden rounded-lg">
                    {
                      event?.imagesLinks?.length > 1
                        ?
                        // <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel>
                          {event?.imagesLinks?.map((src: string, index: number) => (
                            <div key={index} className="relative w-full h-full">
                              <Image src={src} alt={`Slide ${index + 1}`} fill className="object-cover rounded-lg" priority />
                            </div>
                          ))}
                        </Carousel>
                        // </div>
                        :
                        <Image
                          src={event?.imagesLinks?.length ? event.imagesLinks[0] : EVENT_EXAMPLE_IMAGE_URL}
                          alt="Event Image"
                          layout="fill"
                          className="object-cover"
                          priority
                        />
                    }

                  </div>
                  {/* Right Half / Bottom Half: Event Information */}
                  <div
                    className="md:w-1/3  flex flex-col"
                  >
                    <CardHeader className="p-3 md:p-6">
                      <CardTitle className="mx-0">
                        {event.title}
                      </CardTitle>{" "}
                      {/* Event name */}
                    </CardHeader>
                    <CardContent className="flex flex-col p-3 md:p-6 grow items-start">
                      <div className="flex flex-row gap-x-3 pb-4 ">
                        <Badge
                          className={`flex w-fit p-2 text-center justify-center items-center mb-2 ${event.availabilityStatus === "available"
                            ? "bg-green-700"
                            : "bg-gray-500" // Default color for other statuses
                            }`}
                        >
                          <span className="">
                            {event.availabilityStatus}
                          </span>
                        </Badge>
                        <Badge
                          className={`flex w-fit p-2 text-center justify-center items-center mb-2 ${event.locationType === "onsite"
                            ? "bg-green-700"
                            : "bg-primary" // Default color for other statuses
                            }`}
                        >
                          <span className="mx-auto">{event.locationType}</span>
                        </Badge>
                      </div>

                      <div className="w-full flex flex-col grow ">
                        <p className="font-semibold text-gray-700 pb-3">
                          Event Time:
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          <span className="font-medium text-gray-700">
                            Start: {formatDate(new Date(event.eventStartAt))}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          <span className="font-medium text-gray-700">
                            End: {formatDate(new Date(event.eventEndAt))}
                          </span>
                        </p>
                        <p className="font-semibold text-gray-700 pb-3">
                          Registration Time:
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          <span className="font-medium text-gray-700">
                            Open: {formatDate(new Date(event.registerStartAt))}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">
                            Closed: {formatDate(new Date(event.registerEndAt))}
                          </span>
                        </p>
                        <div className="flex flex-row md:flex-col grow pt-4 ">
                          {" "}
                          <div className="grow">
                            <p className="font-semibold text-gray-700">
                              Total Remaining Seats:
                            </p>
                            <p className="text-sm text-gray-500 my-3">
                              <span className="font-medium text-gray-700">
                                {event.totalRemainingSeats}
                              </span>
                            </p>
                          </div>

                          {/* Link to event sessions page */}
                          <div className="flex">
                            {event.availabilityStatus === "available" ? (
                              <Button
                                className="mx-auto w-full "
                                onClick={() => handleSession(event.code)}
                              >
                                Register Now!
                              </Button>
                            ) : event.status === "walkin" ? (
                              <Button disabled>
                                Walk-in : Register On Site
                              </Button>
                            ) : (
                              <>
                                <Button disabled>{capitalizedFirstLetter(event?.availabilityStatus)}</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    {/* <CardFooter className="flex justify-center md:justify-start"></CardFooter> */}
                  </div>
                </div>
              </Card>
            ))
          ) : events && events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default withAuth(EventsPage);
