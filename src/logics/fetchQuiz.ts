import { QuerySnapshot, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { quizConverter } from "./types/quiz";

// 指定したIDのクイズを読み込んで返します。
export async function fetchQuizById(quizId: string) {
  const quizRef = doc(db, "quizzes", quizId);
  const quizSnapshot = await getDoc(quizRef);
  const quiz = quizConverter.fromFirestore(quizSnapshot);
  return quiz;
}


let cachedQuizzesSnapshot: QuerySnapshot;

// ID順に並べ替えられたクイズから指定された番号のクイズを読み込んで返します。一度読み込まれたクイズは自動的にキャッシュされます。
export async function fetchQuizByIndex(index: number) {
  const quizzesRef = collection(db, "quizzes");
  if (cachedQuizzesSnapshot == undefined) {
    cachedQuizzesSnapshot = await getDocs(quizzesRef);
  }
  const quizDocs = cachedQuizzesSnapshot.docs;
  const quizzes = quizDocs.map((quizDoc) => quizConverter.fromFirestore(quizDoc))
  const sortedQuizzes = quizzes.toSorted((a, b) => a.id.localeCompare(b.id))

  try {
    return sortedQuizzes[index];
  } catch {
    throw new RangeError(`fetchQuizByNumber: passed index: ${index}, range of array: ${sortedQuizzes.length}`);
  }
}

// クイズ一覧を読み込んで返します。クイズはID順にソートされます。一度読み込まれたクイズは自動的にキャッシュされます。
export async function fetchQuizzes() {
  const quizzesRef = collection(db, "quizzes");
  if (cachedQuizzesSnapshot == undefined) {
    cachedQuizzesSnapshot = await getDocs(quizzesRef);
  }
  const quizDocs = cachedQuizzesSnapshot.docs;
  const quizzes = quizDocs.map((quizDoc) => quizConverter.fromFirestore(quizDoc))
  const sortedQuizzes = quizzes.toSorted((a, b) => a.id.localeCompare(b.id))
  return sortedQuizzes;
}
