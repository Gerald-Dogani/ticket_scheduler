import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "@angular/fire/auth";
import {BehaviorSubject, first, from, Observable, switchMap, take} from "rxjs";
import {AuthToken, UserI} from "@core/models/models";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {CookieService} from "@core/services/auth-service/cookie.service";
import {Router} from "@angular/router";
import {NgxPermissionsService, NgxRolesService} from "ngx-permissions";
import {AUTH_ENDPOINT} from "@shared/endpoints";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "@shared/entities/UserInterface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;
  credentialData: any;
  private currentTokenSubject: BehaviorSubject<AuthToken>;
  private httpWithoutInterceptor;
  today = new Date();
  tomorrow: Date = new Date();
  nextWeek: Date = new Date();

  constructor(private auth: Auth, private http: HttpClient, private httpBackEnd: HttpBackend, private cookieService: CookieService,
              private router: Router, public ngZone: NgZone, private afAuth: AngularFireAuth, public afs: AngularFirestore,
              private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private snackBar: SnackBarService,
              @Optional() @SkipSelf() singletonService?: AuthService) {

    if (singletonService) {
      throw new Error(`${this.constructor.name} is already loaded`);
    }
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.nextWeek.setDate(this.today.getDate() + 7);

    this.currentTokenSubject = new BehaviorSubject<AuthToken>(new AuthToken());
    this.httpWithoutInterceptor = new HttpClient(httpBackEnd)
    // @ts-ignore
    this.user$ = this.afAuth.authState.pipe(take(1),
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return new Observable<User>
        }
      }))
  }

  login(username: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, username, password).then((async token => {
        if (token) {

          const authToken = AuthToken.deserialize(token.user);
          console.log(authToken)
          await token.user.getIdTokenResult().then(res => {
            authToken.idToken = res.token
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
        this.router.navigate(['auth/verify-email-address']);
      });
  }


  signUp(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail().then(()=>this.SetUserData(result.user));

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

  SetUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userRef)
    const userData: User = {
      uid: '0',
      email: 'gdogani@it-works.io',
      displayName: 'ggggg',
      photoURL: 'user.photoURL',
      emailVerified: false,
      role: {admin: false}
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
