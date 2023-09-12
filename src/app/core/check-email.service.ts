import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable} from "rxjs";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  link = 'http://localhost:3000/users'

  constructor(
    private http: HttpClient
  ) { }

  checkInData(mail: FormControl): Observable<any>{
    const data = this.http.get(this.link).pipe(
      delay(2000),
      map(users => Object.values(users).filter(obj => obj.email === mail)),
    )

    return data
  }
}
