"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/app/inventoryItem/_components/Alert";
import { toast } from "sonner";

export default function RemoveBtn({ id, onDelete }) {
  const router = useRouter();

  console.log("Id mi", id);

  const removeTopic = async () => {
    try {
      const res = await axios.delete(`/api/authLogin?id=${id}`);

      if (res.status === 200) {
        console.log("Successfully Delete");
        onDelete(id);
        toast.success("User successfully delete.");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Alert remove={removeTopic} />;
}
