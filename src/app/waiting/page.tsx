import Link from "next/link";

export default function Waiting() {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023" clip-rule="evenodd" /></svg>
        </Link>
        <div>in チーム1</div>
      </div>
      <div>
        開始までお待ち下さい……………………
      </div>
    </div>
  );
}
