import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Ticket} from "@shared/models/ticket.model";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private db: AngularFirestore, private toast: HotToastService) {
  }

  getTicketsList() {
    return this.db.collection('tickets').snapshotChanges();
  }

  getFilteredTickets() {
    return this.db.collection('tickets', ref => ref.where('ticket_type', '==', 'Economic')).valueChanges();
  }
  // Create Ticket
  addTicket(ticket: Ticket) {
    // delete ticket.id;
    const d = Object.assign({}, ticket)
    return this.db.collection('tickets').add(d)
  }

  getTicket(id: string) {
    return this.db.collection('tickets/' + id).get();
  }

  // ToDo Update
  updateTicket(ticket: Ticket, id: string) {
    this.db.collection('tickets/').doc(id).update(ticket);
  }

  // ToDo Delete
  deleteTicket(id: string) {
    this.db.collection('tickets/').doc(id).delete()
  }

  // addTicket(ticket: Ticket) {
  //   return this.ticketsRef?.push({
  //     seat_number: ticket.seat_number,
  //     id: ticket.id,
  //     inbound: ticket.inbound,
  //     outbound: ticket.outbound,
  //     ticket_type: ticket.ticket_type,
  //     ticket_type_id: ticket.ticket_type_id,
  //     price: ticket.price,
  //     from_date: ticket.from_date,
  //     to_date: ticket.to_date
  //   });
  // }
  // Fetch Single Ticket Object


  // GetTicket(ticket_id: string) {
  //   this.ticketRef = this.db.collection('tickets/' + ticket_id);
  //   return this.ticketRef;
  // }

  // GetTicketsList() {
  //   this.ticketsRef = this.db.collection('tickets').snapshotChanges();
  //   return this.ticketsRef;
  // }
  // Update Ticket Object
  // UpdateTicket(ticket: TicketInt) {
  //   this.ticketRef?.update({
  //     seat_number: ticket.seat_number,
  //     id: ticket.id,
  //     inbound: ticket.inbound,
  //     outbound: ticket.outbound,
  //     ticket_type: ticket.ticket_type,
  //     ticket_type_id: ticket.ticket_type_id,
  //     price: ticket.price,
  //     from_date: ticket.from_date,
  //     to_date: ticket.to_date
  //   });
  // }
  // Delete Ticket Object
  // DeleteTicket(id: string) {
  //   this.ticketRef = this.db.object('tickets/' + id);
  //   this.ticketRef.remove();
  // }
}
