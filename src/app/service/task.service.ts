import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Task} from '../domain/task';
import {HttpUtil} from './http-util';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = 'http://localhost:8080/task/';

  constructor(private http: HttpClient) {
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.taskUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskUrl, task).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(this.taskUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }
}
