import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {TicketService} from "../services/ticket.service";
import {ChartDataset} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2022'];
  public barChartType = 'bar';
  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    {data: [0], label: 'Users', xAxisID: 'x1'},
    {data: [0], label: 'Tickets', xAxisID: 'x2'}
  ];

  constructor(private loader: NgxSpinnerService, public ticketService: TicketService,) {
  }

  ngOnInit(): void {
    this.loader.hide()
    this.getAllTickets();
    this.getAllUsers();
    // this.barChartOptions
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      res => {
        this.barChartData[1].data = [res.length]
      }
    )
  }

  getAllUsers() {
    this.ticketService.getAllUsers().subscribe(
      res => {
        this.barChartData[0].data = [res.length]
      }
    )
  }

}
