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
    <Dialog open={isVisible}>
      <DialogContent hideCloseButton={true}>
        <DialogHeader>
          <h3 className="text-lg font-bold">{title}</h3>
        </DialogHeader>

        <p className="mb-1">Dear Beloved GC Famz,</p>
        <p className="mb-1">
          Gently reminder <strong>HOMEBASE ONSITE</strong> untuk Bulan{" "}
          <strong>JANUARI 2025</strong> akan diadakan pada:
        </p>
        <ul className="list-disc list-inside mb-1">
          <li>
            <strong>Selasa, 07 JANUARI 2025</strong>
          </li>
          <li>
            <strong>Pk. 19.00</strong>
          </li>
          <li>
            <strong>Di Pondok Indah Office Tower 6 Lantai 3</strong>
            <br />
            (Ada Konsumsi Potluck ready <strong>Pk. 18.00</strong>)
          </li>
        </ul>
        <div className="notes mb-1">
          <p className="font-bold mb-2">NOTES!</p>
          <p className="mb-2">
            Agar Homebase ONSITE ini bisa berjalan dengan baik dan mempermudah
            absensi, akan ada beberapa hal yang{" "}
            <span className="font-bold text-red-500">WAJIB DIPERHATIKAN</span>{" "}
            untuk sistem absensi TERBARU sbb:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              Pengerja tidak perlu mendaftar manual untuk homebase. Cukup
              tunjukkan QR Code berikut untuk masuk ke acara homebase.
            </li>
            <li>
              Jika masih bingung dengan cara pendaftaran dapat bertanya ke:
              <ul className="list-disc list-inside ml-6">
                <li>Ps. Billy Yosafat &amp; MIS Team</li>
                <li>Leaders di atas nya</li>
                <li>GC Office</li>
                <li>Teman teman di satu Dept/Bid</li>
              </ul>
            </li>
          </ul>
        </div>
        <p className="mb-2">
          Mari masuk di tahun yang baru ini dengan komitmen dan semangat yang
          baru~~~
        </p>
        <p className="mb-2">
          Terimakasih.
          <br />
          Happy New Year 2025 🎉🎉🎉🎉🎉🎉
        </p>
        <p className="text-gray-800 font-bold">Tuhan Yesus Memberkati 🙏🏼😊</p>

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
