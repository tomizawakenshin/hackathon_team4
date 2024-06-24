import { signInWithAnonymous } from "@/logics/SignInWithAnonymous"

const SignInPanels = () => {
    return (
        <div className="text-center">

            <button onClick={signInWithAnonymous}>ゲームを開始</button>
        </div>
    )
}

export default SignInPanels