"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function fetchMessages() {
  const response = await axios.get("/api/messages");
  return response.data;
}

export function useGetNotifications() {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchMessages,
    refetchInterval: 5000,
    staleTime: 0,
  });
  return { notifications, isLoading, isError };
}
