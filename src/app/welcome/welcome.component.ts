import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  quizTitle: string = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getQuizzes();
  }

  startQuiz() {
    this.router.navigate(['/quiz']);
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizTitle = quizzes.data.title;
    });
  }
}
