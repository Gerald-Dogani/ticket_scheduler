import {Component, Input, OnInit} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() drawer!: MatDrawer;
  @Input() isOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
