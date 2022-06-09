
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Answers, AnswersRelation, QuestionsRelation, Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  disableForm!: boolean;
  form!: FormGroup;
  quizzes: Quiz[] = [];
  questions: QuestionsRelation[] = [];
  answers: number[] = [];
  currentQuestionIndex!: number;
  showAnswerDesc: boolean = false;
  sumOfAnswers: number = 0;

  showResults = false;


  constructor(private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit(): void {
    this.getQuizzes();
    this.createForm();
    this.cdr.detectChanges();

  }

  createForm() {
    this.form = new FormGroup({
      answer: new FormControl(),
    });
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.questions = quizzes.data.questions_relation;
      this.currentQuestionIndex = 0;
    });
  }

  nextOrViewResults() {
    if (this.form.value.answer) {
      this.answers.push(this.form.value.answer);
    }
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }
    this.form.reset();
    this.currentQuestionIndex++;
  }

  sumResults() {
    this.answers.forEach((answer) => {
      this.sumOfAnswers += answer;
    });
    return this.sumOfAnswers;
  }

  getResultsText() {
    if (this.sumResults() > 10) {
      return 'You are more of an extrovert!';
    } else {
      return 'You are more of an introvert!';
    }
  }

  startAgain() {
    this.sumOfAnswers = 0;
    this.answers = [];
    this.form.reset();
    this.router.navigate(['/welcome']);
  }
}
