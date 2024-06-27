"use client";

import { handleReset } from "@/logics/handleReset";
import { turnOffIsGameStartFlag, turnOnIsGameStartFlag } from "@/logics/server/controlIsGameStartFlag";
import { useState } from "react";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmReset = () => {
    handleReset();
    closeModal();
  };
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mb-2">管理画面</h1>
        <button
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 mr-2"
          onClick={turnOnIsGameStartFlag}>
          ゲームを開始
        </button>
        <button
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 mr-2"
          onClick={turnOffIsGameStartFlag}>
          ゲームを終了
        </button>
      </div>
      <div className="border-t border-gray-300 pt-10">
        <div className="text-red-600 font-bold mb-2">Danger Zone</div>
        <div className="border border-red-500 p-4 rounded-lg flex justify-center items-center">
          <button
            className="rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={openModal}>
            DBリセットボタン
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">本当に初期化しますか？</h2>
            <div className="flex justify-end">
              <button
                className="rounded-full bg-red-300 px-4 py-2 font-bold text-red hover:bg-red-700"
                onClick={confirmReset}>
                はい
              </button>
              <button
                className="rounded-full bg-slate-300 px-4 py-2 font-bold text-black hover:bg-gray-400 mr-2"
                onClick={closeModal}>
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
