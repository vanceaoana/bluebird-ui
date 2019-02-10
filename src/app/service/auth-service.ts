import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from './local-storage-service';
import {UserService} from './user.service';

@Injectable()
export class AuthService {
  @Output() changeIsAuthenticated: EventEmitter<boolean> = new EventEmitter();


  constructor(private router: Router,
              @Inject(LOCAL_STORAGE_SERVICE) public localStorage: LocalStorageService,
              public userService: UserService) {
  }

  signIn(username: string, password: string) {

    const authenticationHeaderValue = 'Basic ' + btoa(username + ':' + password);
    this.userService.checkCreditentials(authenticationHeaderValue).subscribe(result => {

        if (result === true) {
          this.changeIsAuthenticated.emit(true);
          this.localStorage.set('Authorization', authenticationHeaderValue);
          this.router.navigate(['']);
        }
      },
      error1 => {
        console.log(error1);
      });


  }

  public isAuthenticated(): boolean {
    const basicAuth = this.localStorage.get('Authorization');
    return !((basicAuth === undefined)  || (basicAuth === null))
  }

  getBasicAuth(): string{
    return this.localStorage.get('Authorization');
  }

  signOut() {
    this.changeIsAuthenticated.emit(false);
    this.localStorage.remove('Authorization');
    this.router.navigate(['/signin']);
  }
}
