import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "@angular/fire/auth";
import {BehaviorSubject, from, Observable} from "rxjs";
import {AuthToken} from "@core/models/models";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {CookieService} from "@core/services/auth-service/cookie.service";
import {Router} from "@angular/router";
import {NgxPermissionsService, NgxRolesService} from "ngx-permissions";
import {AUTH_ENDPOINT} from "@shared/endpoints";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "@shared/entities/UserInterface";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  credentialData: any;
  private currentTokenSubject: BehaviorSubject<AuthToken>;
  private httpWithoutInterceptor;
  today = new Date();
  tomorrow: Date = new Date();
  nextWeek: Date = new Date();

  constructor(private auth: Auth, private http: HttpClient, private httpBackEnd: HttpBackend, private cookieService: CookieService,
              private router: Router, public ngZone: NgZone, public afAuth: AngularFireAuth, public afs: AngularFirestore,
              private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private snackBar: SnackBarService,
              @Optional() @SkipSelf() singletonService?: AuthService) {

    if (singletonService) {
      throw new Error(`${this.constructor.name} is already loaded`);
    }
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.nextWeek.setDate(this.today.getDate() + 7);

    this.currentTokenSubject = new BehaviorSubject<AuthToken>(new AuthToken());
    this.httpWithoutInterceptor = new HttpClient(httpBackEnd);
  }

  login(username: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, username, password).then((async token => {
        if (token) {

          const authToken = AuthToken.deserialize(token.user);
          await token.user.getIdTokenResult().then(res => {
            authToken.idToken = res.token
          })
          this.afAuth.idToken.subscribe(res => {
            console.log(res)
          })
          this.cookieService.setAuthToken(authToken);
          // this.loadPermissions(token['permissions']);
          // this.loadRoles(token['groups']);
          this.currentTokenSubject.next(authToken);
        }
      })
    ));

  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  SetUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userRef)
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user)
      console.log(result)
    })
      .catch((error) => {
        window.alert(error.message);
      }))
  }

  public logout() {
    this.cookieService.deleteAll();
    this.currentTokenSubject.next(new AuthToken());
    this.permissionsService.flushPermissions();
    this.rolesService.flushRoles();
    return from(this.auth.signOut());
  }

  forgotPassword(passwordResetEmail: string) {
    return from(sendPasswordResetEmail(this.auth, passwordResetEmail));
  }

  async isLoggedInPermissions() {
    const currentToken = this.cookieService.getAuthToken();
    if (currentToken && currentToken.idToken !== '') {
      this.http.get(AUTH_ENDPOINT.USER_PERMISSIONS_URL).subscribe({
        next: (response: any) => {
          this.cookieService.setAuthToken(currentToken);
          // this.loadPermissions(response['kind']['permissions']);
          // this.loadRoles(response['data']['groups']);
        },
        error: (error) => {
          throw error;
        }
      })
      return true;
    } else {
      await this.router.navigate(['/login']);
      return false;
    }
  }

  public loadPermissions(permissions: string[]): void {
    this.permissionsService.loadPermissions(permissions); // add permissions
  }

  public loadRoles(roles: string[]): void {
    roles.forEach(group => {
      this.rolesService.addRole(group, () => {
        return true
      })
    });
  }

}
