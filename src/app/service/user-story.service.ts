import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpUtil} from './http-util';
import {UserStory} from '../domain/userStory';


@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
  private userStoryUrl = '/bluebird/api/userstory/';

  private header = new HttpHeaders({'Content-Type': 'application/json'});

  @Output() removeUserStory: EventEmitter<number> = new EventEmitter();
  @Output() addUserStory: EventEmitter<UserStory> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getAllUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.userStoryUrl + 'all', {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  getUserStory(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(this.userStoryUrl + id, {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)));
  }

  createUserStory(userStory: UserStory): void {
    this.http.post<UserStory>(this.userStoryUrl, userStory, {headers: this.header}).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.addUserStory.emit(response);
          console.log('User story with id: ' + response.id + ' has been created ');
        },
        (error) => console.log(error));
  }

  updateUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(this.userStoryUrl, userStory, {headers: this.header})
      .pipe(catchError(err => HttpUtil.handleError(err)));
  }

  deleteUserStory(id: number): void {
    this.http.delete<void>(this.userStoryUrl + id).pipe(catchError(err => HttpUtil.handleError(err)))
      .subscribe(
        (response) => {
          this.removeUserStory.emit(id);
          console.log('UserStory with id: ' + id + ' has been removed ');
        },
        (error) => console.log(error));
  }
}
