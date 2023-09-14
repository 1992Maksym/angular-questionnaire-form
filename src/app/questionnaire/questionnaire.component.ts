import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from "../core/check-email.service";
import {EmailCheckValidator} from "../shared/emailCheck.validator";
import {Hobby} from "../shared/hobby";
import {MatStepper} from "@angular/material/stepper";
import {ServerDataService} from "../core/server-data.service";
import {UserQuestionnaire} from "../shared/user-questionnaire";


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit{
  @ViewChild('stepper') matStepper: MatStepper | undefined

  date:string = ''
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
  isLinear = false;
  hobbyArr:Hobby[] = [];
  hobbyName = '';
  hobbyDuration = '';

  get disableForm(){
    return this.questionnaireForm.invalid || this.hobbyArr.length === 0
  }
  get disableDoneBtn(){
    return this.firstFormGroup.get('firstCtrl')!.value === '' || this.secondFormGroup.get('secondCtrl')!.value === '';
  }
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
    hobby: new FormControl(this.hobbyArr)
  })
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private checkEmailService: CheckEmailService,
    private _formBuilder: FormBuilder,
    private serverData: ServerDataService
  ){

    this.maxDate = new Date()
  }

  ngOnInit():void {

  }

  submitForm(): void{
    const form: UserQuestionnaire = {
      firstName: this.questionnaireForm.controls.name.value!,
      lastName: this.questionnaireForm.controls.surname.value!,
      dateOfBirth: this.date,
      framework: this.questionnaireForm.controls.framework.value!,
      frameworkVersion: this.questionnaireForm.controls.frameworkVersion.value!,
      email: this.questionnaireForm.controls.email.value!,
      hobby: this.questionnaireForm.controls.hobby.value!,
    }

    this.serverData.postQuestionnaire(form);
    this.questionnaireForm.reset();
    this.hobbyArr = [];
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

  doneHobby(){
    if(this.firstFormGroup.get('firstCtrl')!.value !== ''){
      this.hobbyArr.push({
        name: this.firstFormGroup.get('firstCtrl')!.value,
        duration: this.secondFormGroup.get('secondCtrl')!.value
      })

      this.matStepper?.reset()
    }
  }

  getHobbyName(name:HTMLInputElement){
    this.hobbyName = name.value;
  }
  getHobbyDuration(duration:HTMLInputElement){
    this.hobbyDuration = duration.value;
  }
  deleteHobby(item:Hobby){
    const index = this.hobbyArr.indexOf(item)
    this.hobbyArr.splice(index,1)
  }
  changeDate(date: any){
    this.date = date.split('/').join('-')
  }

}
