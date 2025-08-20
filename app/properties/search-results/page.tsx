import { Suspense } from "react";
import SearchResultPage from "./SearchResultPage";
import Spinner from "@/components/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchResultPage />
    </Suspense>
  );
}
