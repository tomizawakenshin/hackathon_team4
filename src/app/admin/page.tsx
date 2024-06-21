"use client";

import { StartGame } from "@/logics/GameStartFlagHandler";
export default function Admin() {

  return (
    <div>
      <div className="text-center">
        <div>管理画面</div>
        <button
          onClick={StartGame}>
          ゲームを開始
        </button>
      </div>
    </div>
  );
}