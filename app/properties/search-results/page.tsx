import { Suspense } from "react";
import SearchResultPage from "./SearchResultPage";
import Spinner from "@/components/Spinner";
import PropertyCardSkeleton from "@/components/PropertyCardsSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<PropertyCardSkeleton />}>
      <SearchResultPage />
    </Suspense>
  );
}
