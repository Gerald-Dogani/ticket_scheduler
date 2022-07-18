import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "@core/components/navigation/menu";
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "@core/services/auth-service/auth.service";
import {User} from "@shared/entities/UserInterface";
import {UserI} from "@core/models/models";
import {CookieService} from "@core/services/auth-service/cookie.service";

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
  user: UserI = new UserI();

  constructor(private authService: AuthService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.user.email = this.cookieService.get('email');
  }

  canToggle() {
    if (!this.isWeb) {
      this.drawer?.toggle(false)
    }
  }
}
