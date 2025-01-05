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
          <p className="">Dear Beloved GC Famz,</p>
          <p className="">
            Gently reminder <strong>HOMEBASE ONSITE</strong> untuk Bulan{" "}
            <strong>JANUARI 2025</strong> akan diadakan pada:
          </p>
          <ul className="list-disc list-inside mb-1">
            <li>
              <strong>Selasa, 07 JANUARI 2025 19.00 WIB</strong>
            </li>
            <li>
              <strong>Di Pondok Indah Office Tower 6 Lantai 3</strong>
              <br />
              (Ada Konsumsi Potluck ready <strong>Pk. 18.00</strong>)
            </li>
          </ul>
          <div className="notes mb-1">
            <p className="mb-2">
              Untuk sistem registrasi,{" "}
              <b>
                pengerja tidak perlu mendaftar manual untuk homebase. Cukup
                tunjukkan{" "}
                <span className="font-extrabold text-red-700">
                  QR Code Homebase di icon paling kanan
                </span>{" "}
                untuk masuk ke acara homebase.:
              </b>
            </p>
          </div>
          <p className="mb-1">
            Mari masuk di tahun yang baru ini dengan komitmen dan semangat yang
            baru~~~
          </p>
          <p className="mb-1">
            Terimakasih.
            <br />
            Happy New Year 2025 🎉🎉🎉🎉🎉🎉
          </p>
          <p className="text-gray-800 font-bold">Tuhan Yesus Memberkati 🙏🏼😊</p>
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
