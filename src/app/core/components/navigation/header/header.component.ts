import {Component, Input, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {LUFTHANSA_IMAGE} from "@shared/cons";
import {NavigationComponent} from "@core/components";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lufthansa_image = LUFTHANSA_IMAGE;
  @Input() drawer!: MatDrawer;

  constructor(private navigate: NavigationComponent) { }

  ngOnInit(): void {
  }

  logout() {
    this.navigate.logout();
  }
}
