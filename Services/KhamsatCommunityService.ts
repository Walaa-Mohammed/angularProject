import {catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import { KhamsatCommunity } from 'src/app/Classes/KhamsatCommunity';
@Injectable({
  providedIn: 'root'
})
export class KhamsatCommunityService {

  constructor(private http:HttpClient) { }
  url='http://localhost:21491/api/KhamsatCommunity';
  addKhamsatCommunity(khamsatCommunity:KhamsatCommunity): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(khamsatCommunity);

    return this.http.post<KhamsatCommunity>(this.url, body,{headers:headers})
}

    returnAllCommunity():Observable<KhamsatCommunity[]>
    {
       return this.http.get<KhamsatCommunity[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    updateKhamsatCommunity(id:any,khamsatCommunity:KhamsatCommunity): Observable<KhamsatCommunity> {
      return this.http.put<KhamsatCommunity>(this.url+'/'+id,khamsatCommunity).pipe(
        catchError((err)=>{
          console.log("erro ocuured")
          return throwError(err.message ||"Internal Server error contact site adminstarator");


        })
      );
  }
  deleteKhamsatCommunity(id: number):Observable<number>{
    return this.http.delete<number>(this.url+'/'+id)
    .pipe(
      catchError( (err) => {
        return throwError(err.message ||"Error deleting travellers data.");
     }));
}
getKhamsatCommunityById(id:any):Observable<KhamsatCommunity>
{
  return this.http.get<KhamsatCommunity>(this.url+'/'+id).pipe(catchError((err)=>
  {

    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}

