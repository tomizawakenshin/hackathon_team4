import Link from "next/link";

export default function Result() {
  return (
    <div className="text-center">
      <div>投票結果</div>
      <div>75%</div>
      <div>4位 チーム1: 83%</div>
      <div>
        <span>75%</span> … <span>おにぎり</span>
        <span>25%</span> … <span>カレー</span>
      </div>
      <div>
        <div>1位 チーム2: 83%</div>
        <div>2位 チーム1: 73%</div>
        <div>3位 チーム4: 43%</div>
        <div>4位 チーム5: 39%</div>
        <div>5位 チーム6: 22%</div>
      </div>
      <Link href="/final-result">Go to final result</Link>
    </div>
  );
}
