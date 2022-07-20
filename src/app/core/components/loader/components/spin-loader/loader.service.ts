import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinLoaderService {
  public visible: boolean = false;

  constructor() {
  }

  destroyLoader() {
    this.visible = false;
  }

  buildLoader() {
    this.visible = true;
  }
}
