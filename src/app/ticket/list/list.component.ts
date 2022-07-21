import {Component, OnInit} from '@angular/core';
import {Ticket} from "@shared/models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {HotToastService} from "@ngneat/hot-toast";
import {LoaderService} from "@core/services/loader.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TicketFormService} from "../services/ticket-form.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tickets: any[] = [];
  width: number = 1000;
  ticketForm: FormGroup = new FormGroup({});
  ticketFormUnit: FormGroup = new FormGroup({});

  constructor(public ticketService: TicketService, public toast: HotToastService,
              public fb: FormBuilder, public ticketFormInit: TicketFormService) {


  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.getAllTickets();
    this.ticketFormUnit = this.ticketFormInit.initTicketUnit();
    this.ticketForm = this.fb.group({
      ticket: this.fb.array([])})
    // this.ticketService.addTicket(new Ticket('test11111', ' adsda', 'asd', 'asd',
    //   213132, new Timestamp(0, 0), new Timestamp(0, 0), 32))


  }

  public getAllTickets() {

    this.ticketService.getTicketsList().subscribe(data => {
        this.tickets = data.map(e => {
          let a = this.ticketForm.get('ticket') as FormArray;
          let b = this.ticketFormInit.initTicketUnit()
          let ss = {id: e.payload.doc.id, ...e.payload.doc.data() as Ticket}
          b.patchValue(ss);
          a.push(b);
          return ss;
        })
        // this.loader.hide();
      }
    );
  }

  get ticketsAsFormArray() {
    return this.ticketForm.controls['ticket'] as FormArray
  }
}
