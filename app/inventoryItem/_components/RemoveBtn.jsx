"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "./Alert";
import { useToast } from "@/hooks/use-toast";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const { toast } = useToast();

  console.log("Id mi", id);

  const removeTopic = async () => {
    try {
      const res = await axios.delete(`/api/products?id=${id}`);

      if (res.status === 200) {
        console.log("Successfully Delete");
        toast({
          title: "Success",
          description: "Product successfully delete.",
          className: "bg-green-500 text-white", // Apply custom classes for green background and white text
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Alert remove={removeTopic} />;
}
