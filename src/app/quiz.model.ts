export interface Quiz {
  title: string;
  questions_relation: QuestionsRelation[];
}

export interface QuestionsRelation {
  question: string;
  answers_relation: AnswersRelation[];
}

export interface AnswersRelation {
  point: Number;
  answer: string;
}

export class Answers {
  constructor(public points: number[] = []) {}
}
