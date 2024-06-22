/*
ゲームの開始、終了を管理するクラス
ゲーム開始時のイベントハンドラを登録することもできます。
*/
export class Game {
  private static instance: Game;

  public static getInstance() {
    if (Game.instance == undefined) {
      Game.instance = new Game([]);
    }
    return Game.instance;
  }

  // ゲーム開始時に実行されるイベントリスナ
  private readonly gameStartEventListeners: (() => void)[];

  private constructor(eventListeners: (() => void)[]) {
    this.gameStartEventListeners = eventListeners;

    // Firestoreのイベントリスナにstart()を登録
  }

  // イベントリスナを登録
  public addGameStartEventListener(eventListener: () => void) {
    this.gameStartEventListeners.push(eventListener);
  }

  // ゲームを開始
  public start() {
    for (const eventListener of this.gameStartEventListeners) {
      eventListener();
    }
    console.log("Game start");
  }
}
