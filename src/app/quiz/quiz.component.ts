
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
  answers: AnswersRelation[] = [];
  currentQuestionIndex!: number;
  showAnswerDesc: boolean = false;

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
      choice: new FormControl(),
    });

    this.form.valueChanges.subscribe(this.onAnswerClick);
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.questions = quizzes.data.questions_relation;
      this.currentQuestionIndex = 0;
    });
  }

  onAnswerClick = () => {
      if (this.form.value.choice.is_right_answer) {
        this.disableForm = true;
        this.answers.push(this.form.value.choice);
      }
      this.disableForm = true;
  };

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }
    this.disableForm = false;
    this.showAnswerDesc = false;
    this.form.value.choice = null;
    this.currentQuestionIndex++;
  }

  startAgain() {
    this.router.navigate(['/welcome']);
  }
}
