import {EventEmitter, Injectable, Output} from '@angular/core';
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

  @Output() removeTask: EventEmitter<Task> = new EventEmitter();
  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.taskUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createTask(task: Task): void {
    this.http.post<Task>(this.taskUrl, task).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.addTask.emit(response);
          console.log('Task with id' + response.id + 'has been created');
        },
      (error) => console.log(error)
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskUrl, task).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteTask(task: Task): void {
    this.http.delete<void>(this.taskUrl + task.id).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.removeTask.emit(task);
          console.log('Task with id' + task.id + ' has been removed');
        },
        (error) => console.log(error)
      );
  }
}
