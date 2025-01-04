import { Dialog, DialogContent, DialogHeader, DialogFooter } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface UserNotRegisteredDialogProps {
  isVisible: boolean;
  onClose: () => void;
}

export const UserNotRegisteredDialog: React.FC<
  UserNotRegisteredDialogProps
> = ({ isVisible, onClose }) => {
  const router = useRouter();

  return (
    <Dialog open={isVisible}>
      <DialogContent hideCloseButton={true} className="max-w-full sm:max-w-md">
        <DialogHeader>
          <h3 className="text-lg font-bold">User Not Registered</h3>
        </DialogHeader>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            The user identifier doesn't exist. Please sign up or go back to
            home.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto btn-primary"
          >
            Sign Up
          </Button>
          <Button onClick={onClose} className="w-full sm:w-auto btn-secondary">
            Back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
