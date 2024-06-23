import { TeamScore } from "@/logics/totalScore";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function decodeQueryToJson(query: string) {
  return JSON.parse(decodeURIComponent(query));
}

/** urlのクエリからスコア情報を読み取って返します。*/
export default function useScoresSearchParams() {
  const searchParams = useSearchParams();
  const queryScore = searchParams.get("scores");
  if (queryScore == null) throw new ReferenceError("Score query is not set");
  try {
    const decodedScore = decodeQueryToJson(queryScore) as TeamScore[];
    return decodedScore;
  } catch (e) {
    throw new Error(`Invalid query format: ${e}`);
  }
}
