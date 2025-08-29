"use client";
// src/reactQuery/useToggleReadStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useOptToggleReadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newReadState,
    }: {
      id: string;
      newReadState: boolean;
    }) => {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: newReadState }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onMutate: async ({ id, newReadState }) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousData = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(["notifications"], (old: any) =>
        old?.map((message: any) =>
          message._id === id ? { ...message, read: newReadState } : message
        )
      );

      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["notifications"], context?.previousData);
      toast.error("Failed to update Notification");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
