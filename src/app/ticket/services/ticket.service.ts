import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {Ticket, Types} from "@shared/models/ticket.model";
import {HotToastService} from "@ngneat/hot-toast";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import firebase from "firebase/compat";
import {TicketInt} from "@shared/entities/TicketInterface";
import {AbstractControl} from "@angular/forms";
import DocumentData = firebase.firestore.DocumentData;
import CollectionReference = firebase.firestore.CollectionReference;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private db: AngularFirestore, private toast: HotToastService) {

  }




  //   this.items$ = combineLatest(
  //     this.sizeFilter$,
  //     this.colorFilter$
  //   ).pipe(
  //     switchMap(([size, color]) =>
  //       afs.collection('items', ref => {
  //         let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
  //         if (size) { query = query.where('size', '==', size) };
  //         if (color) { query = query.where('color', '==', color) };
  //         return query;
  //       }).valueChanges()
  //     )
  //   );
  // }
  // filterBySize(size: string|null) {
  //   this.sizeFilter$.next(size);
  // }
  // filterByColor(color: string|null) {
  //   this.colorFilter$.next(color);
  // }

  getTicketsList(): Observable<DocumentChangeAction<TicketInt>[]> {
    return this.db.collection<TicketInt>('tickets', ref => ref.orderBy('created_date', 'desc')).snapshotChanges();
  }


  getTicketTypes(): Observable<DocumentChangeAction<Types>[]> {
    return this.db.collection<Types>('types').snapshotChanges();
  }

  getTypeById(id: string) {
    return this.db.doc('types/' + id).snapshotChanges();
  }

  // Create Ticket
  addTicket(ticket: TicketInt) {
    // delete ticket.id;
    ticket.ticket_type = this.db.doc(`${ticket.ticket_type}`).ref
    return this.db.collection('tickets').add(ticket)
  }

  addTypes(ticket: any) {
    // delete ticket.id;
    const d = Object.assign({}, ticket)
    return this.db.collection('types').add(d)
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
  private buildQuery(query: CollectionReference<DocumentData>, value: AbstractControl<any>, key: string) {
    return query.where(key, '==', String(value))
  }
}
