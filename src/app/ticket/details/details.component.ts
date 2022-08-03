import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "@shared/models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {log10} from "chart.js/helpers";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  returnUrl: string = '-/list';
  ticketId: string | null = '0';
  ticketDetail: Ticket = new Ticket()

  constructor(private route: ActivatedRoute, private router: Router, public ticketService: TicketService,) {
    this.ticketId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    let docType = {};
    let docTicket: Ticket | undefined = new Ticket();
    if (this.ticketId) {
      this.ticketService.getTicket(this.ticketId).subscribe( {
        next:(t)=>{
          if (t){
            this.ticketDetail = t
          }else {
            this.goTo();
          }
        }

      })
      //   .subscribe(t =>{
      //   console.log(t)
      // })
      //   .then(snap =>{
      //   console.log(snap.docs.pop())
      // })

    } else {
      this.goTo();
    }
  }

  goTo(): void {
    this.router.navigate([this.returnUrl]).then();
  }
}
