"use client";

import { subscribeToGameStartAndNavigate } from "@/logics/GoPostpage";
import { auth } from "@/logics/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { goToPage } from "@/logics/server/goToPage";
import sandwichPersonImage from "@/assets/images/person-on-sandwich.gif";
import matchStickImage from "@/assets/images/match-stick.png";
import ImageSection from "@/components/ImageSection";
import TextSection from "@/components/TextSection";
import { startWatchingQuizPostedTeams } from "@/logics/startWatchingQuizPostedTeams";

const WaitingPage: React.FC = () => {
  useDisableScroll();
  const [user] = useAuthState(auth);
  useEffect(() => {
    // development buildではuseEffectは2回実行されるそうです
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
    subscribeToGameStartAndNavigate(
      user?.uid || "user is not defined"
    );
    startWatchingQuizPostedTeams(() => {
      goToPage("/answer?index=0");
    });
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-300 text-white">
      <ImageSection src={sandwichPersonImage.src} alt="sandwich" width="w-64" />
      <TextSection
        mainText="スタンバイ..."
        subText="暇つぶし"
        description="マッチ棒を2本動かして人にして"
      />
      <ImageSection src={matchStickImage.src} alt="match" width="w-96" />
    </div>
  );
};

export default WaitingPage;
