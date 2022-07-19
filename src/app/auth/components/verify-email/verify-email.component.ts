import {Component, OnInit} from '@angular/core';
import {AuthService} from "@core/services/auth-service/auth.service";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {User} from "@shared/entities/UserInterface";
import {Observable} from "rxjs";
import {UserI} from "@core/models/models";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  user: Observable<User>;
  userData: UserI = new UserI()

  constructor(public authService: AuthService, private snackBar: SnackBarService) {
    this.user = this.authService.user$
  }

  ngOnInit(): void {
    this.user.subscribe(res => this.userData = res)
  }

  sendEmail(): void {
    this.authService.SendVerificationMail().then(r => this.snackBar.onSuccess())
  }
}
