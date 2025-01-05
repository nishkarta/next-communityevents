import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface AnnouncementProps {
  message: string;
  title: string;
  isVisible: boolean;
  onClose: () => void;
}

const Announcement: React.FC<AnnouncementProps> = ({
  message,
  title,
  isVisible,
  onClose,
}) => {
  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent hideCloseButton={true}>
        <DialogHeader>
          <h3 className="text-md font-bold">{title}</h3>
        </DialogHeader>
        <div className="text-sm leading-relaxed md:text-base">
          <p className="mb-1">Dear Beloved GC Famz,</p>
          <div className="notes mb-1">
            <p className="mb-2">
              Untuk sistem registrasi <strong>HOMEBASE ONSITE</strong>,{" "}
              <b>
                pengerja tidak perlu mendaftar manual untuk homebase. Cukup
                tunjukkan{" "}
                <span className="font-extrabold text-red-700">
                  QR Code Homebase di icon paling kanan
                </span>{" "}
                untuk masuk ke acara homebase.
              </b>
              <br />
            </p>
            <p>
              Bagi yang tidak hadir, jangan lupa untuk Email ke{" "}
              <span className="font-extrabold text-red-700">
                gc.office@growcommunity.church
              </span>
              . Ditujukan ke Ps. Andy dan CC kan email ke Leadersnya (Kadiv.,
              Kadept., Kabid. atau Cool Leadersnya masing-masing.)
            </p>
          </div>

          <p className="mb-1">Terimakasih. Tuhan Yesus Memberkati 🙏🏼😊</p>
          <p className="text-gray-800 font-bold"></p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="btn-primary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Announcement;
