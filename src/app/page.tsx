"use client";

import { auth } from "@/logics/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SelectTeam from "@/components/SelectTeam";
import SignInPanels from "@/components/signInPanels";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <SelectTeam />
      ) : (
        <SignInPanels />
      )}
    </div>
  );
}
