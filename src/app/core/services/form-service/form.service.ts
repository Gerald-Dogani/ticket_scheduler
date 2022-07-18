import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(public fb: FormBuilder) { }

  initLogIn(): FormGroup{
    return this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  initSignUp(): FormGroup{
    return this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  initForgetPw(): FormGroup{
    return this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }
}
