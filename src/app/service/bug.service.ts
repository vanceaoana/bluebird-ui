import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }
  getBug(id: number): Observable<Bug> {
    return this.http.get<Bug>(this.bugUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.bugUrl, bug).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  updateBug(bug: Bug): Observable<Bug> {
    return this.http.put<Bug>(this.bugUrl, bug).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteBug(id: number): Observable<void> {
    return this.http.delete<void>(this.bugUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }
}
