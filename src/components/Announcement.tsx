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
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Shalom, berikut informasi yang perlu diperhatikan untuk event
            <strong> "2024 End of the Year Service"</strong>:
          </p>

          <p>
            1. Silahkan mengantri dari depan toko Crocs / Reebok di lantai 3.
          </p>
          <p>2. Waktu open gate adalah 30 menit sebelum mulai.</p>
          <p>
            3. 15 menit setelah ibadah dimulai, seat akan dibuka untuk umum bagi
            jemaat yang belum mendaftar.
          </p>

          <p>
            Terima kasih, Selamat Tahun Baru GROW Family dan Tuhan Memberkati
            🎉🙏
          </p>
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
