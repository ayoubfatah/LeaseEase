"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useOptDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete message");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previous = queryClient.getQueryData<any[]>(["notifications"]);

      queryClient.setQueryData(["notifications"], (old: any[] = []) =>
        old.filter((msg) => msg._id !== id)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      toast.error("Failed to delete notification");
      if (context?.previous) {
        queryClient.setQueryData(["notifications"], context.previous);
      }
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
