import {SignInComponent} from "@auth/components/sign-in/sign-in.component";
import {VerifyEmailComponent} from "@auth/components/verify-email/verify-email.component";
import {ForgotPasswordComponent} from "@auth/components/forgot-password/forgot-password.component";
import {SignUpComponent} from "@auth/components/sign-up/sign-up.component";


export const components: any[] = [
  SignInComponent, SignUpComponent, ForgotPasswordComponent, VerifyEmailComponent,
];

export * from './sign-in/sign-in.component';
export * from './sign-up/sign-up.component';
export * from './forgot-password/forgot-password.component';
export * from './verify-email/verify-email.component';
