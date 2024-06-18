"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  router: AppRouterInstance,
  children: React.ReactNode,
}

export default function TeamCard(props: Props) {
  function goToWaiting() {
    props.router.push("/waiting");
  }

  return (
    <button onClick={goToWaiting} className="bg-pink-100 hover:bg-pink-200 active:bg-pink-300">
      {props.children}
    </button>
  );
}
