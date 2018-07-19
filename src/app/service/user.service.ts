import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserModel} from '../domain/user-model';
import {HttpUtil} from './http-util';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl + 'all').pipe(catchError(err => HttpUtil.handleError(err)));
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userUrl, user).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.userUrl, user).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.userUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }
}
