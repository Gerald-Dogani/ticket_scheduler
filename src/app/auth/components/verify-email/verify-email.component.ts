import { Component, OnInit } from '@angular/core';
import {AuthService} from "@core/services/auth-service/auth.service";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, private snackBar: SnackBarService) { }

  ngOnInit(): void {
  }

  sendEmail(): void{
    this.authService.SendVerificationMail().then(r => this.snackBar.onSuccess())
  }
}
