import { goToPage } from "@/logics/server/goToPage";
import { handleStartGame } from "@/logics/FetchStartAPI";
import { listenToGameStart } from "@/logics/MonitorGameStartFlag";
import { getFirstTeamMember } from "./getFirstMember";

export const subscribeToGameStartAndNavigate = (uid: string) => {
    return listenToGameStart(async () => {
        const FirstMember = await getFirstTeamMember(uid);
        if (FirstMember === uid) {
            goToPage('/post');
        }
        handleStartGame();
    });
};