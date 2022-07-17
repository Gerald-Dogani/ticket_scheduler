import {Component, Input, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {LUFTHANSA_IMAGE} from "@shared/cons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lufthansa_image = LUFTHANSA_IMAGE;
  @Input() drawer!: MatDrawer;

  constructor() { }

  ngOnInit(): void {
  }

}
