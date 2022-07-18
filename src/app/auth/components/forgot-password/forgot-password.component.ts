import {Component, OnInit} from '@angular/core';
import {AuthService} from "@core/services/auth-service/auth.service";
import {FormGroup} from "@angular/forms";
import {LUFTHANSA_IMAGE} from "@shared/cons";
import {FormService} from "@core/services/form-service/form.service";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  lufthansa_image = LUFTHANSA_IMAGE;
  resetPwForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, public form: FormService, private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    this.resetPwForm = this.form.initForgetPw();
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.resetPwForm.value['email']).subscribe({
      next: (_) => {
        this.snackBar.onSuccess('Password reset email sent, check your inbox.')
      },
      error: (error) => {
        this.snackBar.onError(error);
      }
    })
  }
}
