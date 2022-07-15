import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {NavigationComponent} from "./shared/navigation/navigation.component";
import {NavigationModule} from "./shared/navigation/navigation.module";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './core/components/verify-email/verify-email.component';
import {CoreRoutingModule} from "./core/core-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    CoreRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ticket_scheduler'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
