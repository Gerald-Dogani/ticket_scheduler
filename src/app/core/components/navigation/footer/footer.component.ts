import { Component, OnInit } from '@angular/core';
import * as packageInfo from "@core/../../package.json";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public version = packageInfo;
  constructor() { }

  ngOnInit(): void {
  }

}
