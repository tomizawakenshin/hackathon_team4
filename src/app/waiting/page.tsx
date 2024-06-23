"use client";

import { subscribeToGameStartAndNavigate } from "@/logics/GoPostpage";
import { auth } from "@/logics/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Waiting() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    const unsubscribe = subscribeToGameStartAndNavigate((user?.uid) || "user is not defined");
    // development buildではuseEffectは2回実行されるそうです
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development

    // クリーンアップ関数を返してリスナーを解除
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <div>in チーム1</div>
      </div>
      <div>開始までお待ち下さい……………………</div>
    </div>
  );
}
