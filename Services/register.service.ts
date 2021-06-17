import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IUser } from 'src/app/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }

  getAllAccounts(): Observable<IUser[]> {
    let url = 'http://localhost:21491/api/account';
    return this._http.get<IUser[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  getUserById(id: string): Observable<IUser> {
    let url = 'http://localhost:21491/api/account/${id}';
    return this._http.get<IUser>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  getCurrentUser(): Observable<IUser> {
    let url = 'http://localhost:21491/api/account/current';
    return this._http.get<IUser>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  addNewAdmin(newUser: IUser): Observable<IUser> {
    let url = 'http://localhost:21491/RegisterAdmin';
    return this._http.post<IUser>(url, newUser)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }
  addNewUser(newUser: IUser): Observable<IUser> {
    let url = 'http://localhost:21491/Register';
    return this._http.post<IUser>(url, newUser)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }

  updateUser(id: string, userToUpdate: IUser): Observable<IUser> {
    let url = 'http://localhost:21491/api/account/${id}';
    return this._http.put<IUser>(url, userToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
  }

  deleteUser(id: string): Observable<any> {
    let url = 'http://localhost:21491/api/account/${id}';
    return this._http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
}
