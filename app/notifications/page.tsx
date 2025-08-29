"use client";
import Messages from "@/components/Messages";
import NotificationSkeleton from "@/components/ui/NotificationSkeleton";
import { useGetNotifications } from "@/reactQuery/useGetNotification";

export default function MessagesPage() {
  const { notifications, isLoading } = useGetNotifications();

  if (isLoading) {
    return (
      <section className="">
        <div className="container m-auto py-10 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4  m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Notifications : </h1>
            <NotificationSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="container m-auto py-10 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4  m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Notifications : </h1>
          {notifications.length > 0 ? (
            notifications?.map((message: any, i: number) => {
              return <Messages key={notifications._id} message={message} />;
            })
          ) : (
            <div>No Notifications Yet</div>
          )}
        </div>
      </div>
    </section>
  );
}
