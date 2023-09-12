import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {Observable, tap} from 'rxjs';
import {CheckEmailService} from "../core/check-email.service";

export class EmailCheckValidator {
  static createValidator(emailService: CheckEmailService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return emailService
        .checkInData(control.value)
        .pipe(
          tap(el => el? <ValidationErrors>{emailAlreadyExists: true} : null)
        );
    };
  }
}


