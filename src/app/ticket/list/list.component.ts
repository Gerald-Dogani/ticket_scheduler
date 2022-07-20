import {Component, OnInit} from '@angular/core';
import {Ticket} from "@shared/models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {HotToastService} from "@ngneat/hot-toast";
import firebase from "firebase/compat/app";
import {LoaderService} from "@core/services/loader.service";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tickets: any[] = []

  constructor(public ticketService: TicketService, public toast: HotToastService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.getAllTickets();
    this.ticketService.addTicket(new Ticket('dsasd', ' adsda', 'asd', 'asd',
      213132, new Timestamp(0, 0), new Timestamp(0, 0), 32))
  }

  public getAllTickets() {

    this.ticketService.getTicketsList().subscribe(data => {
        this.tickets = data.map(e => {
          return {id: e.payload.doc.id, ...e.payload.doc.data() as Ticket};
        });
        // this.loader.hide();
      }
    );

  }
}
