"use client";

import { Suspense } from "react";
import InnerAnswerPage from "@/components/InnerAnswerPage";

/**
 * クイズのインデックスをクエリパラメータで受け取って、対応するクイズの回答画面を表示します。
 * `useSearchParams`は`Suspense`で囲わないとbuild時にエラーを吐くそうです
 * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 */
const AnswerPage: React.FC = () => {
  return (
    <Suspense>
      <InnerAnswerPage />
    </Suspense>
  );
};

export default AnswerPage;
