export class SerializeUtil {
  public serialize(): any {
  }

  public static deserialize<T>(obj: T, data: { [key: string]: any }): T {
    return Object.assign(obj, data);
  }

  public static deserializeList<T>(obj: T[], data: { [key: string]: any }): T[] {
    return Object.assign(obj, data);
  }
}

export class AuthToken {
  constructor(public idToken: string = '', public refreshToken: string = '',
              public localId: number = 0, public expiresIn: string = '', public email: string = '',
              public displayName: string = '',public registered: string = '',) {
  }

  public static deserialize(obj: { [key: string]: any }): AuthToken {

    return new AuthToken(obj['idToken'], obj['refreshToken'], obj['localId'], obj['displayName'], obj['email'], obj['expiresIn'], obj['registered']);
  }

}


