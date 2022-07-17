export interface FirebaseError {
  code: number;
  errors: FireBaseErrors[];
  message: string;
}

export interface FireBaseErrors {
  message: string;
  domain: string;
  reason: string;
}
