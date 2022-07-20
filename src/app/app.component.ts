import {Component, OnInit, Renderer2} from '@angular/core';
import {SITE_KEY} from "@shared/cons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticket_scheduler';
  siteKey: string = SITE_KEY;
  token: string|undefined;
  constructor(private _render:Renderer2,) {
  }
  ngOnInit() {

    let script = this._render.createElement('script')
    script.defer = true;
    script.async = true;
    script.src = 'https://www.google.com/recaptcha/api.js';
    this._render.appendChild(document.body, script)
}



  resolved(token: any){
    this.token = token;
  }

}
