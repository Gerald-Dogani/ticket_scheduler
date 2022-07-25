import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = ['2020', '2025', '2030','2035', '2040', '2045', '2050'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Users'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Tickets'}
  ];

  constructor(private loader: NgxSpinnerService,) {
  }

  ngOnInit(): void {
    this.loader.hide()
  }

}
