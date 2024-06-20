import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export interface Quiz {
  // クイズID
  id: string;

  // クイズを投稿したチームのID
  teamId: string;

  // 問題文
  problem: string;

  // 選択肢
  options: string[];
}

export const quizConverter = {
  fromFirestore: (snapshot: DocumentSnapshot): Quiz => {
    const data = snapshot.data();

    if (!snapshot.exists()) throw new ReferenceError("Quiz document does not exists");
    if (data?.id == undefined) throw new ReferenceError("Quiz id does not exists");
    if (data?.teamId == undefined) throw new ReferenceError("Quiz teamId does not exists");
    if (data?.problem == undefined) throw new ReferenceError("Quiz problem does not exists");
    if (data?.options == undefined) throw new ReferenceError("Quiz options does not exists");

    return {
      id: data.id,
      teamId: data.teamId,
      problem: data.problem,
      options: data.options,
    };
  },
};
