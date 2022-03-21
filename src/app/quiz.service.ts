import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor (private httpClient: HttpClient) { }


  getQuizzes(): Observable<any> {
    return this.httpClient.get<any>('assets/quiz.json');
  }
}
