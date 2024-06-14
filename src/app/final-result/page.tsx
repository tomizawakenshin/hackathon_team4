import Link from "next/link";

export default function FinalResult() {
  return (
    <div className="text-center">
      <div>最終結果</div>
      <div>
        <div>1st チーム1: 平均84%</div>
        <div>2st チーム2: 平均40%</div>
        <div>3st チーム3: 平均34%</div>
        <div>4st チーム4: 平均27%</div>
        <Link href="post-quiz">Go to post-quiz</Link>
      </div>
    </div>
  );
}
