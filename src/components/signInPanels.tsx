import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import bgtopPage from "@/assets/images/bg-topPage.png";
import bgtopPagePC from "@/assets/images/bg-topPage-pc.png";
import play from "@/assets/images/play.png";
import Image from "next/image";
import { auth } from "@/logics/firebase";
import { goToPage } from "@/logics/server/goToPage";
import { useAuthState } from "react-firebase-hooks/auth";

const SignInPanels = () => {
  const [user] = useAuthState(auth);
  async function buttonClickHandler() {
    if (user == (null || undefined)) await signInWithAnonymous();
    goToPage("/select-team");
  }
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
          onClick={buttonClickHandler}
          className="text-2xl p-8 border-2 rounded-full bg-yellow-300 flex items-center justify-center active:bg-gray-400 transition-colors duration-300"
        >
          <Image src={play} alt="" className="h-[5vh] w-full" />
        </button>
      </div>
    </div>
  );
};

export default SignInPanels;
