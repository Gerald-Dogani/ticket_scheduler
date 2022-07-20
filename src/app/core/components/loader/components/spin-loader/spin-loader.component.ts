import { Component, OnInit } from '@angular/core';
import {SpinLoaderService} from "./loader.service";

@Component({
  selector: 'app-spin-loader',
  templateUrl: './spin-loader.component.html',
  styleUrls: ['./spin-loader.component.scss']
})
export class SpinLoaderComponent implements OnInit {

  constructor(public loaderService: SpinLoaderService) { }

  ngOnInit(): void {
  }

  show() {
    this.loaderService.buildLoader();
  }

  hide() {
    this.loaderService.destroyLoader();
  }

}
