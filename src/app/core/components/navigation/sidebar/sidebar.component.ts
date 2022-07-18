import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "@core/components/navigation/menu";
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "@core/services/auth-service/auth.service";
import {User} from "@shared/entities/UserInterface";

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
  user: User;

  constructor(private authService: AuthService) {
  this.user = this.authService.userData
  }

  ngOnInit(): void {
    console.log(this.user)
  }

  canToggle() {
    if (!this.isWeb) {
      this.drawer?.toggle(false)
    }
  }
}
