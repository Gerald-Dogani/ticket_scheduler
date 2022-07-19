import {environment} from "../../environments/environment";


export const LOGIN_URL = `${environment.firebase.authDomain}/auth/knock-knock/`;
export const USER_PERMISSIONS_URL = `${environment.firebase.authDomain}/auth/user-permissions/`;
export const CHANGE_PASSWORD_URL = `${environment.firebase.authDomain}/auth/change-password/`;
export const FORGOT_PASSWORD_URL = `${environment.firebase.authDomain}/`;

export const AUTH_ENDPOINT = {
    LOGIN_URL,
    USER_PERMISSIONS_URL,
    CHANGE_PASSWORD_URL,
    FORGOT_PASSWORD_URL,
};
