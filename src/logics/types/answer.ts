export interface Answer {
  // 回答のID
  answerId: string;

  // 回答したユーザのID
  userId: string;

  // 回答したチームのユーザID
  teamId: string;

  // 回答した番号
  answerNumber: number;
}
