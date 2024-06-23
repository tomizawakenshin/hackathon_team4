"use client"

import useGoToResultAutomatically from "@/hooks/useGoToResultAutomatically";

export default function ResultWaiting() {
  useGoToResultAutomatically();
  return (
    <div>
      全員が回答するまでお待ち下さい……………………
    </div>
  );
}
