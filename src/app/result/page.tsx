"use client";

import { useEffect } from "react";

const ResultPage: React.FC = () => {
  useEffect(() => {
    // スクロールを禁止する
    document.body.style.overflow = "hidden";
    return () => {
      // クリーンアップ時に元に戻す
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-resultPage.jpg')" }}
    >
      結果は...
    </div>
  );
};

export default ResultPage;
