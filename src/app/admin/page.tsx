"use client"

import { Game } from "@/logics/game";

export default function Admin() {
  function gameStartButtonHandler() {
    const game = Game.getInstance();
    game.start();

    console.log("Game Start!");
  }

  return (
    <div className="text-center">
      <div>管理画面</div>
      <button onClick={gameStartButtonHandler}>ゲームを開始</button>
    </div>
  );
}
