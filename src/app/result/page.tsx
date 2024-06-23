"use client";

import InnerResultPage from "@/components/InnerResultPage";
import { Suspense } from "react";

const ResultPage: React.FC = () => {
  return (
    <Suspense>
      <InnerResultPage />
    </Suspense>
  )
};

export default ResultPage;
