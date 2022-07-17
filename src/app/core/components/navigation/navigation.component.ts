import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {AuthService} from "@core/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private route: Router, private authService: AuthService, private loader: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe({
        next: (_) => {
          this.route.navigate([`login`]);
        },
        complete: () => {
          this.loader.hide();
        }
      },
    );
  }
}
