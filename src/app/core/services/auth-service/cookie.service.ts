import {Injectable, Optional, SkipSelf} from '@angular/core';
import {AuthToken, SerializeUtil} from "@core/models/models";
import {CookieService as NGXCookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private readonly SAME_SITE = 'Lax';
  private readonly SECURE = true;
  private readonly EXPIRATION_DAYS = 1;
  private readonly PATH = undefined;
  private readonly DOMAIN = undefined;
  private readonly AUTH_TOKEN_PREFIX = '';

  protected constructor(private cookieService: NGXCookieService, @Optional() @SkipSelf() singletonService?: CookieService) {
    if (singletonService) {
      throw new Error(`${this.constructor.name} is already loaded`);
    }
  }

  public getAuthToken(): AuthToken | null {
    return this.getObject(new AuthToken(), this.AUTH_TOKEN_PREFIX);
  }

  public setAuthToken(authToken: AuthToken): void {
    this.setObject(authToken, this.AUTH_TOKEN_PREFIX);
  }

  public deleteAuthToken(): void {
    Object.keys(new AuthToken()).forEach(key => this.delete(key));
  }

  public check(key: string): boolean {
    return this.cookieService.check(key);
  }

  public get(key: string): string {
    return this.cookieService.get(key);
  }

  public getObject(object: { [key: string]: any }, prefix: string): any | null {
    const cookieObj: { [key: string]: string } = {}
    Object.keys(object).forEach(key => {
      cookieObj[key] = this.get(prefix + key)
    });
    if (cookieObj['localId']) {
      return SerializeUtil.deserialize(object, cookieObj);
    }
    return null;
  }

  public getAll(): { [key: string]: string } {
    return this.cookieService.getAll();
  }

  public set(key: string, value: string): void {
    this.cookieService.set(key, value, this.EXPIRATION_DAYS, this.PATH, this.DOMAIN, this.SECURE, this.SAME_SITE);
  }

  public setObject(object: { [key: string]: any }, prefix: string): void {
    Object.entries(object).forEach(([key, value]) => this.set(prefix + key, value));
  }

  public delete(key: string): void {
    this.cookieService.delete(key, this.PATH, this.DOMAIN, this.SECURE, this.SAME_SITE);
  }

  public deleteObject(object: { [key: string]: any }, prefix: string): void {
    Object.keys(object).forEach(key => this.delete(prefix + key));
  }

  public deleteAll(): void {
    this.cookieService.deleteAll(this.PATH, this.DOMAIN, this.SECURE, this.SAME_SITE);
  }
}
