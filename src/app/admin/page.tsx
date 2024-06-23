"use client";

import { handleStartGame } from "@/logics/FetchStartAPI";

export default function Admin() {
  return (
    <div>
      <div className="text-center">
        <div>管理画面</div>
        <button
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleStartGame}>
          ゲームを開始
        </button>
      </div>
    </div>
  );
}