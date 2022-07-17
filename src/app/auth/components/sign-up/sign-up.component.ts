import { Component, OnInit } from '@angular/core';
import {LUFTHANSA_IMAGE} from "@shared/cons";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "@core/services/auth-service/auth.service";
import {HotToastService} from "@ngneat/hot-toast";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormService} from "@core/services/form-service/form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseError} from "@shared/entities/ErrorInterface";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  lufthansa_image = LUFTHANSA_IMAGE;
  signUpForm: FormGroup = new FormGroup({});
  returnUrl: string = '';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService,
              private toast: HotToastService, private snack: SnackBarService, private loader: NgxSpinnerService,
              public form: FormService, private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.createSignUp();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '-';

  }

  createSignUp(): void {
    this.signUpForm = this.form.initSignUp();
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.loader.show();
      const {email, password} = this.signUpForm.value;
      this.authService.login(email, password).pipe(
        this.toast.observe({
          success: 'Signed in successfully',
          loading: 'Signing in...',
          error: 'There was an error',
        })
      ).subscribe({
          next: _ => {
            this.router.navigate([this.returnUrl])
          },
          error: (error: FirebaseError) => {
            this.signUpForm.controls['email'].setErrors({'incorrect': true});
            this.signUpForm.controls['password'].setErrors({'incorrect': true});
            this.snack.onError(error);
          },
          complete: () => {
            this.loader.hide();
          }
        }
      );
    } else {
      this.signUpForm.value.setErrors({'invalid': true})
    }
    this.hideErrors();
  }

  hideErrors() {
    this.signUpForm.controls['email'].setErrors(null);
    this.signUpForm.controls['password'].setErrors(null);
  }
}
