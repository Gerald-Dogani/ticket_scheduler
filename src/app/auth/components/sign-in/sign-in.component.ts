import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "@core/services/form-service/form.service";
import {AuthService} from "@core/services/auth-service/auth.service";
import {HotToastService} from "@ngneat/hot-toast";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {FirebaseError} from "@shared/entities/ErrorInterface";
import {LUFTHANSA_IMAGE} from "@shared/cons";
import {NgxSpinnerService} from "ngx-spinner";
import {timer} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  lufthansa_image = LUFTHANSA_IMAGE;
  loginForm: FormGroup = new FormGroup({});
  returnUrl: string = '';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService,
              private toast: HotToastService, private snack: SnackBarService, private loader: NgxSpinnerService,
              public form: FormService, private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.logout();
    this.createLogin();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '-';

  }

  logout() {
    this.authService.logout().subscribe({
        next: (_) => {
          this.router.navigate([`auth/login`]);
        },
        complete: () => {
          this.loader.hide();
        }
      },
    );
  }


  createLogin(): void {
    this.loginForm = this.form.initLogIn();
    this.loader.hide();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.loader.show();
      const {email, password} = this.loginForm.value;
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
            this.loginForm.controls['email'].setErrors({'incorrect': true});
            this.loginForm.controls['password'].setErrors({'incorrect': true});
            this.snack.onError(error);
          },
          complete: () => {
            this.loader.hide();
          }
        }
      );
    } else {
      this.loginForm.value.setErrors({'invalid': true})
    }
    this.hideErrors();
  }

  hideErrors() {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
  }
}
