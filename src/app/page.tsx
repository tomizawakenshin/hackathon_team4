"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <div>this is page</div>
      <div>
        <Link href="/waiting">Go to waiting page</Link>
      </div>
    </div>
  );
}
