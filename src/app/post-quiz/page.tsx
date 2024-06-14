import Link from "next/link";

export default function PostQuiz() {
  return (
    <div className="text-center">
      <div className="mt-24">問題を投稿</div>
      <input placeholder="Input" className="border-gray-500 border-2 rounded"/>
      <div>4つの回答を入力してください</div>
      <div>
        <input placeholder="Option 1" className="border-gray-500 border-2 rounded"/>
        <input placeholder="Option 2" className="border-gray-500 border-2 rounded"/>
        <input placeholder="Option 3" className="border-gray-500 border-2 rounded"/>
        <input placeholder="Option 4" className="border-gray-500 border-2 rounded"/>
      </div>
      <Link href="/ans-quiz" className="border-2 border-gray-500 rounded bg-white hover:bg-slate-100 active:bg-slate-200 px-6 mt-6">OK</Link>
    </div>
  );
}
