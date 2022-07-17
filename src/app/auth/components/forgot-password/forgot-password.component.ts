import { Component, OnInit } from '@angular/core';
import {AuthService} from "@core/services/auth-service/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.authService.forgotPassword
  }
}
