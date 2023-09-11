import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {CheckEmailService} from "../core/check-email.service";


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


  get formControls() {
    return this.questionnaireForm.controls;
  }

  questionnaireForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    framework: new FormControl('',[Validators.required]),
    frameworkVersion: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, this.checkEmail]),
  })

  constructor(
    private checkEmailService: CheckEmailService
  ){
    this.maxDate = new Date()
  }

  ngOnInit(): void{

  }
  submitForm(){
    console.log(this.questionnaireForm.value)
  }
  changeFramework(value:any){
    this.frameworkItem = value;
    this.selectedArr = Object.values(this.frameworkVersions)[this.frameworks.indexOf(this.frameworkItem)]
  }

  getEmailErrorMessage() {
    if (this.formControls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formControls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage() {
      return 'You must enter a value';
  }

  checkEmail(control: AbstractControl): Observable<ValidationErrors | null> | null{
    this.checkEmailService.bla()
    console.log(control)
    return null
  }




}
