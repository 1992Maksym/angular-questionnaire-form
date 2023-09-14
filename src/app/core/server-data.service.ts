import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserQuestionnaire} from "../shared/user-questionnaire";

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
  usersLink = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  postQuestionnaire(form: UserQuestionnaire) {
    this.http.post(this.usersLink, form).subscribe()
  }
}
