export interface Quiz {
  id: number;
  start_date: string;
  status: number;
  title: string;
  desc: string;
  questions_relation: QuestionsRelation[];
}

export interface QuestionsRelation {
  id: number;
  quiz_id: number;
  question: string;
  desc: string;
  answers_relation: AnswersRelation[];
}

export interface AnswersRelation {
  id: number;
  question_id: number;
  is_right_answer: number;
  answer: string;
  desc: string;
}

export class Answers {
  constructor(public values: number[] = []) {}
}
