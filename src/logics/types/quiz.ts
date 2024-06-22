import { DocumentSnapshot } from "firebase/firestore";

export interface Quiz {
  // クイズID
  id: string;

  // クイズを投稿したチームのID
  teamId: string;

  // 問題文
  question: string;

  // 選択肢
  options: string[];
}

export const quizConverter = {
  fromFirestore: (snapshot: DocumentSnapshot): Quiz => {
    const data = snapshot.data();

    if (!snapshot.exists()) throw new ReferenceError("Quiz document does not exists");
    if (data == undefined) throw new ReferenceError("Quiz has no data");
    if (data.id == undefined) throw new ReferenceError("Quiz id does not exists");
    if (data.teamId == undefined) throw new ReferenceError("Quiz teamId does not exists");
    if (data.question == undefined) throw new ReferenceError("Quiz question does not exists");
    if (data.options == undefined) throw new ReferenceError("Quiz options does not exists");

    return {
      id: data.id,
      teamId: data.teamId,
      question: data.quiestion,
      options: data.options,
    };
  },
};
