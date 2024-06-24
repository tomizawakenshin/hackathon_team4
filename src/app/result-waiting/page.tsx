"use client";

import hourglassImage from "@/assets/images/hourglass.gif";
import kanjiQuizImage from "@/assets/images/kanji-quiz.png";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import useGoToResultAutomatically from "@/hooks/useGoToResultAutomatically";
import ImageSection from "@/components/ImageSection";
import TextSection from "@/components/TextSection";

const ResultWaiting: React.FC = () => {
  useDisableScroll();
  useGoToResultAutomatically();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-300 text-white">
      <ImageSection src={hourglassImage.src} alt="hourglass" width="w-24" />
      <TextSection
        mainText="結果待ち..."
        subText="暇つぶし"
        description="⬜️に入る漢字は？"
      />
      <ImageSection src={kanjiQuizImage.src} alt="kanji-quiz" width="w-64" />
    </div>
  );
};

export default ResultWaiting;
