import { Card, CardContent } from "@/components/ui/card";

export default function NotificationSkeleton() {
  return (
    <Card className="transition-all duration-200 my-4">
      <CardContent className="p-4">
        {/* Header section with property name and date */}
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-8"></div>
        </div>

        {/* Message body */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>

        {/* Contact information */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <div className="h-7 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-7 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </CardContent>
    </Card>
  );
}
