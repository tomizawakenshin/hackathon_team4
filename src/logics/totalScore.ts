import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Answer } from "./types/answer";
import { fetchQuizzes } from "./fetchQuiz";
import { fetchTeams } from "./fetchTeams";
import { Team } from "./types/team";

/** スコアを集計して結果を返します。*/
export async function totalScore() {
  const teams = await fetchTeams();
  const allAnswersClassifiedByQuizzes = await fetchQuizAnswersArray();
  const teamAnswersArray = classifyByTeam(allAnswersClassifiedByQuizzes, teams);
  const finalScores = calculateScore(teamAnswersArray);
  return finalScores;
}

/** チームのスコアを表すインターフェースです。*/
export interface TeamScore {
  teamId: string;
  matchRate: number;
}

function calculateScore(teamAnswersArray: TeamAnswers[]) {
  const finalScores: TeamScore[] = [];
  teamAnswersArray.forEach((teamAnswers) => {
    const matchRate = calculateAverageMatchRate(teamAnswers);
    finalScores.push({
      teamId: teamAnswers.teamId,
      matchRate: matchRate,
    });
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
  const answerNumberPatterns: number[] = [];
  answerNumbers.forEach((answerNumber) => {
    if (!answerNumberPatterns.includes(answerNumber)) answerNumberPatterns.push(answerNumber);
  });

  const matchCounts: number[] = [];
  answerNumberPatterns.forEach((answerNumberPattern) => {
    let matchCount: number = 0;
    answerNumbers.forEach((answerNumber) => {
      if (answerNumber == answerNumberPattern) matchCount++;
    });
    matchCounts.push(matchCount);
  });

  const greatestMatchCount = matchCounts.toSorted((a, b) => b - a)[0];

  const matchRate = greatestMatchCount / answerNumbersLength;

  return matchRate;
}

function classifyByTeam(quizAnswersArray: QuizAnswers[], teams: Team[]) {
  const teamAnswersArray: TeamAnswers[] = [];
  teams.forEach((team) => {
    const teamAnswers: TeamAnswers = {
      teamId: team.id,
      quizzes: [],
    };
    quizAnswersArray.forEach((quizAnswers) => {
      const quizAnswersOfTeam: QuizAnswers = {
        quizId: quizAnswers.quizId,
        answers: [],
      };
      quizAnswers.answers.forEach((answer) => {
        if (answer.teamId == team.id) quizAnswersOfTeam.answers.push(answer);
      });
      teamAnswers.quizzes.push(quizAnswersOfTeam);
    });
    teamAnswersArray.push(teamAnswers);
  });
  return teamAnswersArray;
}

async function fetchQuizAnswersArray() {
  const quizzes = await fetchQuizzes();
  const quizAnswersArray: QuizAnswers[] = [];
  quizzes.forEach(async (quiz) => {
    const answers = await fetchAnswers(quiz.id);
    quizAnswersArray.push({
      quizId: quiz.id,
      answers: answers,
    });
  });
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
