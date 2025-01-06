"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/providers/AuthWrapper";
import { useAuth } from "@/components/providers/AuthProvider";
import HeaderNav from "@/components/HeaderNav";
import VerifyTicketDialog from "@/components/VerifyTicketDialog";

interface EventDetails {
  type: string;
  code: string;
  title: string;
  allowedFor: string;
  allowedRoles: string[];
  allowedUsers: string[];
  allowedCampuses: string[];
  status: string;
}

interface EventSession {
  type: string;
  eventCode: string;
  code: string;
  title: string;
  registerFlow: string;
  checkType: string;
  totalSeats: number;
  bookedSeats: number;
  scannedSeats: number;
  totalRemainingSeats: number;
  status: string;
}

function EventSessionsAdmin({ params }: { params: { eventCode: string } }) {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleExpiredToken, getValidAccessToken } = useAuth();

  const fetchEventDetails = async () => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      handleExpiredToken();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v2/internal/events/${params.eventCode}/summary`,
        {
          headers: {
            "X-API-KEY": API_KEY || "",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 401) {
        handleExpiredToken();
        return;
      }
      const data = await response.json();
      setEventDetails(data.details);
      setSessions(data.data || []); // Ensure sessions is an array
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [params.eventCode]);

  return (
    <>
      <HeaderNav
        name={`Admin Dashboard Event-${params.eventCode}`}
        link="dashboard"
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Event Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {eventDetails && (
              <div className="mb-4">
                <h2 className="text-xl font-bold">{eventDetails.title}</h2>
                <p className="text-sm">
                  <strong>Allowed For:</strong> {eventDetails.allowedFor}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {eventDetails.status}
                </p>
                <Badge className="mt-2">{eventDetails.status}</Badge>
              </div>
            )}
            <h2 className="text-xl font-bold mb-4">Sessions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Total Seats
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Booked Seats
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Remaining Seats
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <TableRow key={session.code}>
                      <TableCell>{session.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{session.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {session.totalSeats}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {session.bookedSeats}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {session.totalRemainingSeats}
                      </TableCell>
                      <TableCell>
                        <VerifyTicketDialog
                          eventCode={params.eventCode}
                          eventName={eventDetails ? eventDetails.title : ""}
                          sessionCode={session.code}
                          sessionName={session.title}
                        ></VerifyTicketDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No sessions available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}

export default withAuth(EventSessionsAdmin);
