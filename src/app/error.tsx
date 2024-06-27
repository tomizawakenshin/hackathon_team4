"use client";

import { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error(props: Props) {
  useEffect(() => {
    console.log("Error Catched:");
    console.log(props.error);
  }, []);

  return (
    <div className="text-center">
      <div className="h-52" />
      <h2 className="mx-16 rounded border-2 border-red-400 bg-red-50 p-4 font-bold">エラーが発生しました😢</h2>
      <p className="mt-4 text-xs">{props.error.message}</p>
      <button
        className="mt-16 rounded-full bg-red-300 px-6 py-2 font-bold text-white"
        onClick={() => {
          props.reset();
        }}
      >
        再試行！
      </button>
    </div>
  );
}
