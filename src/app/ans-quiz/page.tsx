import Link from "next/link";

export default function AnsQuiz() {
  return (
    <div className="text-center">
      <div>スイカの色は？</div>
      <div>
        <label>
          <input type="radio" id="opt1" name="opts" value="opt1" />
          あか
        </label>
      </div>
      <div>
        <label>
          <input type="radio" id="opt2" name="opts" value="opt2" />
          みどり
        </label>
      </div>
      <div>
        <label>
          <input type="radio" id="opt3" name="opts" value="opt3" />
          黒と緑
        </label>
      </div>
      <div>
        <label>
          <input type="radio" id="opt4" name="opts" value="opt4" />
          黄色
        </label>
      </div>
      <Link href="/result">確定！</Link>
    </div>
  );
}
