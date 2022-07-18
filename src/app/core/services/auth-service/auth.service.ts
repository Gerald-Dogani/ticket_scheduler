import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {Auth, sendPasswordResetEmail, signInWithEmailAndPassword} from "@angular/fire/auth";
import {BehaviorSubject, from, map, Observable} from "rxjs";
import {AuthToken} from "@core/models/models";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {CookieService} from "@core/services/auth-service/cookie.service";
import {Router} from "@angular/router";
import {NgxPermissionsService, NgxRolesService} from "ngx-permissions";
import {AUTH_ENDPOINT} from "@shared/endpoints";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getToken} from "@angular/fire/app-check";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;
  credentialData:any;
  private currentTokenSubject: BehaviorSubject<AuthToken>;
  private httpWithoutInterceptor;
  today = new Date();
  tomorrow: Date = new Date();
  nextWeek: Date = new Date();

  constructor(private auth: Auth, private http: HttpClient, private httpBackEnd: HttpBackend, private cookieService: CookieService,
              private router: Router, public ngZone: NgZone, public afAuth: AngularFireAuth, public afs: AngularFirestore,
              private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService,
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
