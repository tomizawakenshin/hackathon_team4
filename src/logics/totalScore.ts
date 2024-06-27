import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Answer } from "./types/answer";
import { fetchQuizzes } from "./fetchQuiz";
import { fetchTeams } from "./fetchTeams";
import { Team } from "./types/team";

/** スコアを集計して結果を返します。*/
export async function totalScore() {
  const teams = await fetchTeams();
  const quizAnswers = Array.from(await fetchQuizAnswersArray());
  const teamAnswersArray = classifyByTeam(quizAnswers, teams);
  const finalScores = calculateScore(teamAnswersArray);

  console.log("totalScore: finealScore:");
  console.log(finalScores);
  return finalScores;
}

/** チームのスコアを表すインターフェースです。*/
export interface TeamScore {
  teamId: string;
  matchRate: number;
}

function calculateScore(teamAnswersArray: TeamAnswers[]) {
  const finalScores: TeamScore[] = teamAnswersArray.map((teamAnswers) => {
    const matchRate = calculateAverageMatchRate(teamAnswers);
    return {
      teamId: teamAnswers.teamId,
      matchRate: matchRate,
    };
  });
  return finalScores;
}

function calculateAverageMatchRate(teamAnswers: TeamAnswers) {
  const quizzesLength = teamAnswers.quizzes.length;
  let sumMatchRate: number = 0;
  teamAnswers.quizzes.forEach((quizAnswers) => {
    const matchRate = calculateMatchRate(quizAnswers.answers);
    sumMatchRate += matchRate;
  });
  const averageMatchRate = sumMatchRate / quizzesLength;
  return averageMatchRate;
}

function calculateMatchRate(answers: Answer[]) {
  const answerNumbers = answers.map((answer) => answer.answerNumber);

  const answerNumbersLength = answerNumbers.length;
  const answerNumberPatterns: number[] = Array.from(new Set(answerNumbers));

  const matchCounts: number[] = [];
  answerNumberPatterns.forEach((answerNumberPattern) => {
    let matchCount: number = 0;
    answerNumbers.forEach((answerNumber) => {
      if (answerNumber == answerNumberPattern) matchCount++;
    });
    matchCounts.push(matchCount);
  });

  const greatestMatchCount = matchCounts.toSorted((a, b) => b - a)[0];

  if (answerNumbersLength == 0) throw new Error("No answers is registered in a certain team");
  const matchRate = greatestMatchCount / answerNumbersLength;

  return matchRate;
}

function classifyByTeam(quizAnswersArray: QuizAnswers[], teams: Team[]) {
  const teamAnswersArray = teams.map((team): TeamAnswers => {
    const quizAnswersArrayOfTeam = quizAnswersArray.map((quizAnswers): QuizAnswers => {
      const answersOfTeam = quizAnswers.answers.filter((answer) => answer.teamId == team.id);
      return {
        quizId: quizAnswers.quizId,
        answers: answersOfTeam
      };
    });
    return {
      teamId: team.id,
      quizzes: quizAnswersArrayOfTeam,
    };
  });
  return teamAnswersArray;
}

async function fetchQuizAnswersArray() {
  const quizzes = await fetchQuizzes();
  const quizAnswersArray: QuizAnswers[] = await Promise.all(quizzes.map(async (quiz): Promise<QuizAnswers> => {
    return {
      quizId: quiz.id,
      answers: await fetchAnswers(quiz.id)
    }
  }));
  return quizAnswersArray;
}

async function fetchAnswers(quizId: string) {
  const answersRef = collection(db, "quizzes", quizId, "answers");
  const answersSnapshot = await getDocs(answersRef);
  const answerDocs = answersSnapshot.docs;
  const answers = answerDocs.map((answerDoc): Answer => {
    const answerData = answerDoc.data();

    const answerId = answerData.answerId;
    const answerNumber = answerData.answerNumber;
    const teamId = answerData.teamId;
    const userId = answerData.userId;

    if (answerId == undefined) throw new ReferenceError("Answer id does not exist");
    if (answerNumber == undefined) throw new ReferenceError("Answer number does not exist");
    if (teamId == undefined) throw new ReferenceError("Team id does not exist");
    if (userId == undefined) throw new ReferenceError("User id does not exist");

    return {
      answerId: answerId,
      answerNumber: answerNumber,
      teamId: teamId,
      userId: userId,
    };
  });
  return answers;
}

interface TeamAnswers {
  teamId: string;
  quizzes: QuizAnswers[];
}

interface QuizAnswers {
  quizId: string;
  answers: Answer[];
}
