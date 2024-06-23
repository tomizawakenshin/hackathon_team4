"use client";

import sandwichPersonImage from "@/assets/images/person-on-sandwich.gif";
import matchStickImage from "@/assets/images/match-stick.png";
import { useEffect } from "react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { handleStartGame } from "@/logics/FetchStartAPI";
import { listenToGameStart } from "@/logics/MonitorGameStartFlag";
import { goToPage } from "@/logics/server/goToPage";

const WaitingPage: React.FC = () => {
  useDisableScroll();

  useEffect(() => {
    const unsubscribe = listenToGameStart(() => {
      goToPage("/post");
      handleStartGame();
    });
    // development buildではuseEffectは2回実行されるそうです
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development

    // クリーンアップ関数を返してリスナーを解除
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-300 text-white">
      <div className="flex justify-center">
        <img src={sandwichPersonImage.src} alt="sandwich" className="w-64" />
      </div>
      <h1 className="text-5xl font-bold my-8">スタンバイ...</h1>
      <p className="text-3xl font-bold mb-1">暇つぶし</p>
      <p className="text-xl font-semibold mb-4">
        マッチ棒を2本動かして人にして
      </p>
      <div className="flex justify-center">
        <img src={matchStickImage.src} alt="match" className="w-96" />
      </div>
    </div>
  );
};

export default WaitingPage;
