"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ResultPage: React.FC = () => {
  const router = useRouter();

  // チーム名と%は仮置き
  const [teamResults, setTeamResults] = useState([
    { teamName: "チーム1", percentage: 75 },
    { teamName: "チーム2", percentage: 75 },
    { teamName: "チーム3", percentage: 75 },
    { teamName: "チーム4", percentage: 50 },
    { teamName: "チーム5", percentage: 50 },
    { teamName: "チーム6", percentage: 25 },
    { teamName: "チーム7", percentage: 25 },
  ]);

  //   useEffect(() => {
  //     // チームの結果を取得するロジックを追加

  //     const timer = setTimeout(() => {
  //       router.push("/question");
  //     }, 10000); // 10秒後に次の質問へ遷移

  //     return () => clearTimeout(timer);
  //   }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-700">
      <h1 className="text-4xl font-bold">投票結果</h1>
      <div className="mt-2 ">
        <h2 className="text-2xl text-center font-semibold">75%</h2>
        <ul>
          <li>
            <p>75% - おにぎり</p>
          </li>
          <li>
            <p>25% - カレー</p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col mt-5 space-y-1 w-full max-w-80">
        {teamResults.map((result, index) => (
          <div
            key={index}
            className="flex p-2 border border-gray-700 rounded-md bg-white"
          >
            <h3>{index + 1}位</h3>
            <p className="ml-40">
              {result.teamName} {result.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
