"use client";

import { handleStartGame } from "@/logics/FetchStartAPI";

export default function Admin() {
  return (
    <div>
      <div className="text-center">
        <div>管理画面</div>
        <button
          onClick={handleStartGame}>
          ゲームを開始
        </button>
      </div>
    </div>
  );
}