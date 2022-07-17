import { Injectable } from '@angular/core';
import {Auth, sendPasswordResetEmail, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  forgotPassword(passwordResetEmail: string) {
    return from(sendPasswordResetEmail(this.auth, passwordResetEmail));
  }
}
