"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/components/providers/AuthProvider";
import withAuth from "@/components/providers/AuthWrapper";
import HeaderNav from "@/components/HeaderNav";
import { useParams } from "next/navigation";
import { API_BASE_URL, API_KEY } from "@/lib/config";
import { Button } from "@/components/ui/button";

const QRScan: React.FC = () => {
  const { eventCode, sessionCode } = useParams();
  const [scannerInput, setScannerInput] = useState<string>("");
  const { isAuthenticated, handleExpiredToken } = useAuth();
  const [message, setMessage] = useState<string>("");

  const userData = isAuthenticated
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : null;

  const lastSubmittedQRCode = useRef<string | null>(null); // Track the last submitted QR code

  const sendToAPI = async (qrCode: string) => {
    if (lastSubmittedQRCode.current === qrCode) return; // Prevent redundant calls
    lastSubmittedQRCode.current = qrCode;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/internal/events/registrations/${qrCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
            "X-API-Key": API_KEY || "",
          },
          body: JSON.stringify({
            sessionCode: sessionCode,
            status: "active",
          }),
        }
      );

      if (response.ok) {
        setMessage("Success!");
      } else {
        if (response.status === 401) {
          handleExpiredToken();
        } else {
          const errorResult = await response.json();
          setMessage(errorResult.status);
        }
      }
    } catch (error) {
      console.error("Error while connecting to the API", error);
    }
  };

  // Effect to handle API call whenever a new QR code is scanned
  useEffect(() => {
    if (scannerInput) {
      sendToAPI(scannerInput.trim());
    }
  }, [scannerInput]);

  // Effect to handle QR code scanning
  useEffect(() => {
    let accumulatedInput = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "Enter" || key === "n") {
        const scannedCode = accumulatedInput.trim(); // Trim the accumulated value for safety
        if (scannedCode) {
          setScannerInput(scannedCode); // Trigger API call
        }
        accumulatedInput = ""; // Clear accumulated input after submission
      } else {
        // Accumulate characters into a separate variable
        accumulatedInput += key;
      }
    };

    // Listen for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <HeaderNav
        name={`QR Scanner for Event Code : ${eventCode} Session : ${sessionCode}`}
        link={`dashboard/${eventCode}`}
      />
      <Card className="xl:col-span-2 w-1/2 mx-auto mt-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>QR Scanner</CardTitle>
            <CardDescription>Message : {message}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>Current QR Code: {scannerInput || "No QR code scanned yet."}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default withAuth(QRScan);
