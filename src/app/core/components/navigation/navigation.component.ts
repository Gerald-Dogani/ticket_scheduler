import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";
import {AuthService} from "@core/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MENU} from "@core/components/navigation/menu";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  readonly menu = MENU;
  @ViewChild('drawer') public drawer!: MatDrawer;
  screenHeight: number = 0;
  screenWidth: number = 0;
  mode: MatDrawerMode = 'side';
  opened: boolean = true;
  web: boolean = true;

  constructor(private route: Router, private authService: AuthService, private loader: NgxSpinnerService) {
  this.getScreenSize()
  }

  ngOnInit(): void {
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: EventListener) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if(this.screenWidth<1000 && this.drawer.opened){
      this.mode = 'push';
      this.drawer?.toggle();
      this.web = false;
    }
  }
  logout() {
    this.authService.logout().subscribe({
        next: (_) => {
          this.route.navigate([`auth/login`]);
        },
        complete: () => {
          this.loader.hide();
        }
      },
    );
  }
}
