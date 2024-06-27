import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import bgtopPage from "@/assets/images/bg-topPage.png";
import bgtopPagePC from "@/assets/images/bg-topPage-pc.png";
import play from "@/assets/images/play.png";
import Image from "next/image";

const SignInPanels = () => {
  return (
    <div className="relative h-screen w-screen bg-cover">
      <div
        className="absolute top-0 left-0 h-full w-full bg-cover md:hidden"
        style={{
          backgroundImage: `url(${bgtopPage.src})`,
        }}
      />
      <div
        className="absolute top-0 left-0 h-full w-full bg-cover hidden md:block"
        style={{
          backgroundImage: `url(${bgtopPagePC.src})`,
        }}
      />
      <div className="relative text-center max-w-screen-sm mx-auto h-full flex flex-col justify-center items-center">
        <h1 className="font-mono text-xl mb-8">powered by 征夷大将軍</h1>
        <p className="font-mono text-7xl mb-8">チームの</p>
        <p className="font-mono text-7xl mb-8 self-start pl-5">
          <span className="text-yellow-300 text-8xl">力</span>を
        </p>
        <p className="font-mono text-7xl mb-8">
          <span className="text-green-300 text-8xl">集結</span>
        </p>
        <p className="font-mono text-7xl mb-8 self-end pr-5">せよ</p>
        <button
          onClick={signInWithAnonymous}
          className="text-2xl p-8 border-2 rounded-full bg-yellow-300 flex items-center justify-center"
        >
          <Image src={play} alt="" className="h-[5vh] w-full" />
        </button>
      </div>
    </div>
  );
};

export default SignInPanels;
