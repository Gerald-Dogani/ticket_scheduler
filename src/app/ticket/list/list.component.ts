import {Component, OnInit} from '@angular/core';
import {Ticket} from "@shared/models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tickets: Ticket[] = []

  constructor(public ticketService: TicketService, public toast: HotToastService) {
  }

  ngOnInit(): void {
    this.getAllTickets();
    // this.ticketService.addTicket(new Ticket(1,'dsasd', ' adsda', 'asd', 'asd',213132, new Date, new Date, 32 ))
  }

  public async getAllTickets() {
    this.ticketService.getTicketsList().subscribe(data => {
      if(data.length <= 0){
        console.log(data)
      } else {
      }
    })
  }
}
