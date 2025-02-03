"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import QrCodeScanner from "./QRScanner";

const VerifyTicketDialog = ({
  eventCode,
  eventName,
  sessionCode,
  sessionName,
  onlineEvent = false,
}: {
  eventCode: string;
  eventName: string;
  sessionCode: string;
  sessionName: string;
  onlineEvent?: boolean;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-FIT h-10">QR Scanner (Camera)</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg md:max-w-xl mx-auto my-auto flex flex-col justify-center items-center">
          <DialogHeader>
            <DialogTitle>
              Current Session: {sessionName} ({sessionCode})
            </DialogTitle>
          </DialogHeader>
          {sessionCode ? (
            <QrCodeScanner
              eventCode={eventCode}
              sessionCode={sessionCode}
              onlineEvent={true}
            />
          ) : (
            <div className="text-red-500">Error: Please select a session.</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyTicketDialog;
