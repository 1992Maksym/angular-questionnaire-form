import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, tap} from "rxjs";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  link = 'http://localhost:3000/users'

  constructor(
    private http: HttpClient
  ) { }

  bla(){
    console.log('blabla')
  }

  checkInData(email: string): Observable<ValidationErrors | null> | null{
    const data = this.http.get(this.link).pipe(
      delay(2000),
      tap(el => console.log('in service: ' + el)),
    ).subscribe()

    return null
  }
}
