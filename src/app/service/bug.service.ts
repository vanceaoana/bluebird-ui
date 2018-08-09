import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Bug} from '../domain/bug';
import {HttpUtil} from './http-util';


@Injectable({
  providedIn: 'root'
})
export class BugService {
  private bugUrl = 'http://localhost:8080/bug/';

  @Output() removeBug: EventEmitter<Bug> = new EventEmitter();
  @Output() addBug: EventEmitter<Bug> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getBug(id: number): Observable<Bug> {
    return this.http.get<Bug>(this.bugUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createBug(bug: Bug): void {
    this.http.post<Bug>(this.bugUrl, bug).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.addBug.emit(response);
          console.log('Bug with id' + response.id + 'has been created');
        },
        (error) => console.log(error)
      );
  }

  updateBug(bug: Bug): Observable<Bug> {
    return this.http.put<Bug>(this.bugUrl, bug).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteBug(bug: Bug): void {
    this.http.delete<void>(this.bugUrl + bug.id).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.removeBug.emit(bug);
          console.log('Bug with id' + bug.id + ' has been removed');
        },
        (error) => console.log(error)
      );
  }
}
