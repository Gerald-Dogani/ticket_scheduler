import {Roles} from "@shared/entities/UserInterface";

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
              public displayName: string = '', public registered: string = '', public user: UserI = new UserI()) {
  }

  public static deserialize(obj: { [key: string]: any }): AuthToken {

    return new AuthToken(obj['idToken'], obj['refreshToken'], obj['localId'], obj['displayName'], obj['email'],
      obj['expiresIn'], obj['registered'], obj['user']);
  }

}

export class Role {
  constructor(public subscriber?: boolean, public editor?: boolean, public admin?: boolean) {
  }
}

export class UserI {

  constructor(public displayName: string = '',
              public email: string = '', public emailVerified: boolean = false,
              public photoURL: string = '', public uid: string = '', public role: Role = new Role()) {
  }
}

