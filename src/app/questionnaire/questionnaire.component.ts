import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from "../core/check-email.service";
import {EmailCheckValidator} from "../shared/emailCheck.validator";


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  maxDate: Date;
  frameworks = ["angular", "react", "vue"];
  frameworkVersions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }
  selectedArr:string[] = []
  frameworkItem:string = '';
  versionItem = '';
  mail = 'test2@test.test'


  get formControls() {
    return this.questionnaireForm.controls;
  }

  questionnaireForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    framework: new FormControl('',[Validators.required]),
    frameworkVersion: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email],[EmailCheckValidator.createValidator(this.checkEmailService)]),
  })

  constructor(
    private checkEmailService: CheckEmailService,
  ){

    this.maxDate = new Date()
  }

  ngOnInit(): void{

  }
  submitForm(): void{
  }
  changeFramework(value:any): void{
    this.frameworkItem = value;
    this.selectedArr = Object.values(this.frameworkVersions)[this.frameworks.indexOf(this.frameworkItem)]
  }

  getEmailErrorMessage(): string {
    if (this.formControls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formControls.email.hasError('email') ? 'Not a valid email' : 'Email already exist';
  }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

}
