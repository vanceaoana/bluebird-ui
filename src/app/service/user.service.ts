import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserModel} from '../domain/user-model';
import {HttpUtil} from './http-util';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/bluebird/api/user/';
  private header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Basic dXNlcjp1c2Vy'});

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl + 'all', {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + id, {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userUrl, user, {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.userUrl, user, {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteUser(id: number): Observable<void> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<void>(this.userUrl + id).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  checkCreditentials(authenticationHeaderValue: string): Observable<boolean> {
    let authHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': authenticationHeaderValue});
    return this.http.get<boolean>(this.userUrl + 'authenticate', {headers: authHeader}).pipe(catchError(err => HttpUtil.handleError(err)));
  }
}
