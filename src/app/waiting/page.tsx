"use client";

import { Game } from "@/logics/game";
import { goToPage } from "@/logics/goToPage";
import Link from "next/link";
import { useEffect } from "react";

export default function Waiting() {
  useEffect(() => {
    const game = Game.getInstance();
    game.addGameStartEventListener(() => {
      console.log("Start Event Handler");
      goToPage("/post");
    });
    // development buildではuseEffectは2回実行されるそうです
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
    console.log("subscribe event");
  }, []);

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <div>in チーム1</div>
      </div>
      <div>開始までお待ち下さい……………………</div>
        <button
          onClick={() => {
            console.log("Game Start button clicked");
            const game = Game.getInstance();
            game.start();
          }}
        >
          Game Start
        </button>
    </div>
  );
}
