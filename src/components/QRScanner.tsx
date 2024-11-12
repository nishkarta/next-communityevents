"use client";
import { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./providers/AuthProvider";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "./ui/alert-dialog";

function QrCodeScanner({ sessionCode }: { sessionCode: string }) {
  const { isAuthenticated, handleExpiredToken } = useAuth();
  const userData = isAuthenticated
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : null;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [dialogVariant, setDialogVariant] = useState("info"); // You can set variants based on the type of alert
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = async (result: IDetectedBarcode[]) => {
    if (result && result.length > 0) {
      const uuid = result[0]?.rawValue;
      const splitData = uuid.split("+");

      try {
        setLoading(true);
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/internal/events/registrations/${uuid}`,
        //   {
        //     method: "PATCH",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${userData.token}`,
        //       "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
        //     },
        //     body: JSON.stringify({
        //       sessionCode: sessionCode,
        //       status: "active",
        //     }),
        //   }
        // );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/registration/homebase`,
          {
            method: "POST",
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
              name: splitData[2],
              identifier: splitData[1],
              accountNumber: splitData[0],
              eventCode: "HB-001",
              sessionCode: "HB-001-01",
              otherRegister: [],
            }),
          }
        );

        if (response.ok) {
          setDialogTitle("Success!");
          setDialogDescription("User verified.");
          setDialogVariant("success");
        } else {
          if (response.status === 401) {
            handleExpiredToken();
            return; // Exit function after handling expired token
          } else {
            const errorData = await response.json();
            setDialogTitle(errorData.status || "Error");
            setDialogDescription(errorData.message || "Something went wrong.");
            setDialogVariant("error");
          }
        }
      } catch (error) {
        setDialogTitle("Error");
        setDialogDescription("Error while connecting to the API.");
        setDialogVariant("error");
        console.error("Error while connecting to the API", error);
      } finally {
        setLoading(false);
      }
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Scanner
        scanDelay={5000}
        allowMultiple={true}
        onScan={handleScan}
        paused={loading || dialogOpen} // Pause scanning when the dialog is open
      />

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={
                dialogVariant === "success" ? "text-green-500" : "text-red-500"
              }
            >
              {dialogTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setDialogOpen(false)}>
            OK
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default QrCodeScanner;
