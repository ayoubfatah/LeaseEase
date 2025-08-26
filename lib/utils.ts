import { clsx, type ClassValue } from "clsx";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  format,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date();
  const target = typeof date === "string" ? new Date(date) : date;

  const minutes = differenceInMinutes(now, target);
  const hours = differenceInHours(now, target);
  const days = differenceInDays(now, target);
  const weeks = differenceInWeeks(now, target);

  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1min ago";
  if (minutes < 60) return `${minutes}min ago`;

  if (hours === 1) return "1 h ago";
  if (hours < 24) return `${hours}h ago`;

  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}days ago`;

  if (weeks === 1) return "A week ago";
  if (weeks < 5) return `${weeks}weeks ago`;

  // If older than 4 weeks, just show the date
  return format(target, "MMM d, yyyy");
}
