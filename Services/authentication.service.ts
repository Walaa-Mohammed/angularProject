import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Classes/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, passwordHash: string) {
      return this.http.post<any>('http://localhost:21491/Login', { email, passwordHash })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;
    // constructor( private router: Router,private http: HttpClient) {
    //     this.userSubject = new BehaviorSubject<User>
    //     (JSON.parse(localStorage.getItem('user')));
    //     this.user = this.userSubject.asObservable();
    // }

    // public get userValue(): User {
    //     return this.userSubject.value;
    // }

    // login(email: string, PasswordHash: string) {
    //     return this.http.post<any>('http://localhost:21491/Login', { email, PasswordHash })
    //         .pipe(map(res => {
    //             this.setSession(res);
    //             console.log(res);
    //         }));
    // }


    // private setSession(authResult: { expiration: any; token: string; }) {
    //     //const expiresAt = moment().add(authResult.expiresIn,'second');
    //     const expiresAt = authResult.expiration;
    //     localStorage.setItem('token', authResult.token);
    //     localStorage.setItem("expires_at", JSON.stringify(expiresAt));//.valueOf()) );
    // }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("expires_at");
    //     this.router.navigate(['/login']);
    // }

    // public isLoggedIn() {
    //     if(localStorage.getItem('token')){
    //         let token = localStorage.getItem('token');

    //         console.log(token);

    //         let jwtData = token.split('.')[1]

    //         let decodedJwtJsonData = window.atob(jwtData)

    //         let decodedJwtData = JSON.parse(decodedJwtJsonData)

    //         let expirationDateInMills = decodedJwtData.exp * 1000;

    //         let todayDateInMills = new Date().getTime();

    //         if (expirationDateInMills >= todayDateInMills)
    //             return true;

    //     }
    //     return false;
    // }

    // isLoggedOut() {
    //     return !this.isLoggedIn();
    // }
    // getRole():string {
    //     if(localStorage.getItem('token')){
    //         let token = localStorage.getItem('token');

    //         let jwtData = token.split('.')[1]

    //         let decodedJwtJsonData = window.atob(jwtData)

    //         let decodedJwtData = JSON.parse(decodedJwtJsonData)
    //         return decodedJwtData.role;
    //     }
    //     return "No Role";
    //   }
    // getUserId(){
    //     if(localStorage.getItem('token')){
    //         let token = localStorage.getItem('token');

    //         let jwtData = token.split('.')[1]

    //         let decodedJwtJsonData = window.atob(jwtData)

    //         let decodedJwtData = JSON.parse(decodedJwtJsonData)
    //         let userID=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    //         return userID;
    //     }
    //     return null;
   // }

}
