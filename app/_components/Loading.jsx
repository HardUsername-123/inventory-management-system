import React from "react";
import { Triangle } from "react-loader-spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"; // Make sure to import from the correct path
import { ScaleLoader } from "react-spinners";

const Loading = ({ isOpen, onClose }) => {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}
      className="bg-transparent border-none"
    >
      <AlertDialogContent className="sm:max-w-[300px] h-[300px] flex justify-center items-center bg-transparent shadow-none border-none">
        <div className="flex justify-center items-center py-4">
          <ScaleLoader color="#ffffff" size={50} />
        </div>
        <AlertDialogTitle className="hidden">Loading</AlertDialogTitle>
        {/* Optionally add a title */}
        <AlertDialogDescription className="hidden">
          Please wait...
        </AlertDialogDescription>
        {/* Optionally add a description */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loading;
