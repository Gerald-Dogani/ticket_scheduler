import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "@core/components/navigation/menu";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() drawer!: MatDrawer;
  @Input() isOpen: boolean = true;
  @Input() isWeb: boolean = true;
  @Input() menu: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  canToggle() {
    if (!this.isWeb) {
      this.drawer?.toggle(false)
    }
  }
}
