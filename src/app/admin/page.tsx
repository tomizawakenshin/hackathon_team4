"use client"

export default function Admin() {
  function gameStartButtonHandler() {
    console.log("Game Start!")
  }

  return (
    <div className="text-center">
      <div>管理画面</div>
      <button onClick={gameStartButtonHandler}>ゲームを開始</button>
    </div>
  );
}
