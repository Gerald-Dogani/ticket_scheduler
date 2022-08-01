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
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = ['2022'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    {data: [0], label: 'Users'},
    {data: [0], label: 'Tickets'}
  ];

  constructor(private loader: NgxSpinnerService, public ticketService: TicketService,) {
  }

  ngOnInit(): void {
    this.loader.hide()
    this.getAllTickets();
    this.getAllUsers();
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      res => {
        this.barChartData[1].data = [res.size]
      }
    )
  }

  getAllUsers() {
    this.ticketService.getAllUsers().subscribe(
      res => {
        this.barChartData[0].data = [res.size]
      }
    )
  }

}
