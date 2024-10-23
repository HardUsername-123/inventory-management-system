import React from "react";
import { Triangle } from "react-loader-spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Loading = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px] h-[300px] flex justify-center items-center">
        <div className="flex justify-center items-center py-4">
          <Triangle
            visible={true}
            height="90"
            width="90"
            color="#000000"
            ariaLabel="triangle-loading"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
