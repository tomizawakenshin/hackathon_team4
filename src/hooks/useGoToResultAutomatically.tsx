import { startWatchingQuizCompletedUsers } from "@/logics/startWatchingQuizCompletedUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useGoToResultAutomatically() {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = startWatchingQuizCompletedUsers((finalScores) => {
      const finalScoresQuerry = encodeURIComponent(JSON.stringify(finalScores));
      router.push(`/result?scores=${finalScoresQuerry}`);
    });
    return unsubscribe;
  }, []);
}
