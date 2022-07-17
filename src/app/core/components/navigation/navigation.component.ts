import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "@core/services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private route: Router, private authService: AuthService,) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }
}
