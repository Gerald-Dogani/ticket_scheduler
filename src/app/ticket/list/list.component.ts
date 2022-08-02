import {Component, OnInit} from '@angular/core';
import {Ticket, Types} from "@shared/models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {HotToastService} from "@ngneat/hot-toast";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TicketFormService} from "../services/ticket-form.service";
import {EDIT_FORM_URL} from "@shared/endpoints";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {ThemePalette} from "@angular/material/core";
import {scFormatDateTimeToTimeStamp} from "@shared/cons";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import firebase from "firebase/compat";
import {TicketInt} from "@shared/entities/TicketInterface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items$: Observable<DocumentChangeAction<TicketInt>[]>;
  fromDateFilter$: BehaviorSubject<Date>;
  toDateFilter$: BehaviorSubject<Date>;
  inbound$: BehaviorSubject<string>;
  outbound$: BehaviorSubject<string>;


  tickets: any[] = [];
  width: number = 1000;
  ticketForm: FormGroup = new FormGroup({});
  ticketSearchForm: FormGroup = new FormGroup({});
  url: string = EDIT_FORM_URL;

  color: ThemePalette = 'accent';
  today = new Date();
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  stepHours = [1, 2, 3, 4, 5];
  stepMinutes = [1, 5, 10, 15, 20, 25];
  stepSeconds = [1, 5, 10, 15, 20, 25];

  constructor(public ticketService: TicketService, public toast: HotToastService, public loader: NgxSpinnerService,
              public fb: FormBuilder, public ticketFormInit: TicketFormService, private snack: SnackBarService,
              private afs: AngularFirestore) {
    this.fromDateFilter$ = new BehaviorSubject(new Date());
    this.toDateFilter$ = new BehaviorSubject(new Date());
    this.inbound$ = new BehaviorSubject('');
    this.outbound$ = new BehaviorSubject('');
    this.items$ = combineLatest(
      this.fromDateFilter$,
      this.toDateFilter$,
      // this.inbound$,
      // this.outbound$,
    ).pipe(switchMap(([fromDate, toDate]) => this.afs.collection<any>('Tickets', ref => {
        let query: firebase.firestore.QuerySnapshot | firebase.firestore.Query = ref;
        console.log(fromDate)
        if (fromDate || toDate) {
          query = query.where('from_date', '>', fromDate)
        }
        if (toDate) {
          query = query.where('to_date', '<=', toDate)
        }
        // if (inbound) {
        //   query = query.where('inbound', '==', inbound)
        // }
        return query
      }).valueChanges()
    ))

  }

  ngOnInit(): void {
    this.loader.show();
    this.width = window.innerWidth;
    this.ticketSearchForm = this.ticketFormInit.initTicketUnit();
    this.ticketForm = this.fb.group({
      ticket: this.fb.array([])
    })
    this.getAllTickets();
  }

  goToEdit(index: number) {
    window.open(`${this.url}-/details/${index}/`, '_blank');
  }


  public getAllTickets() {
    this.ticketService.getTicketsList().subscribe(data => {
        this.tickets = data.map(e => {
          let a = this.ticketForm.get('ticket') as FormArray;
          let b = this.ticketFormInit.initTicketUnit()
          b.controls['ticket_type_id'].enable();
          const type_id = e.payload.doc.data().ticket_type.id
          this.ticketService.getTypeById(type_id).subscribe(type => {
            let ticket_type = (type.payload.data() as Types)?.ticket_type
            if (!ticket_type) {
              ticket_type = 'not selected'
            }
            let ss = {
              id: e.payload.doc.id, ...e.payload.doc.data() as Ticket,
              ticket_type: ticket_type
            }
            b.patchValue(ss);
            a.push(b);
            return ss;
          })
        })

        this.loader.hide();
      }, error => {
        this.snack.onError(error);
        this.loader.hide();
      }
    );
  }

  get ticketsAsFormArray() {
    return this.ticketForm.controls['ticket'] as FormArray
  }

  show($event: any) {
    this.ticketSearchForm.value['to_date'] = scFormatDateTimeToTimeStamp(this.ticketSearchForm.value['to_date']);
  }

  searchTicket() {
    // this.ticketService.getFilteredTickets(this.ticketSearchForm.value)

    Object.keys(this.ticketSearchForm.controls).forEach(key => {
      if (this.ticketSearchForm.controls[key].value) {
        if (key == 'from_date' && this.ticketSearchForm.controls[key].value) {
          this.filterByFromDate(this.ticketSearchForm.controls[key].value);
        }
        if (key == 'to_date' && this.ticketSearchForm.controls[key].value) {
          this.filterByToDate(this.ticketSearchForm.controls[key].value);
        }
        if (key == 'inbound' && this.ticketSearchForm.controls[key].value) {
          this.filterByInbound(this.ticketSearchForm.controls[key].value);
        }
      }
    })
    this.items$.subscribe(data => {
      this.ticketForm = this.fb.group({
        ticket: this.fb.array([])
      });
      this.tickets = data.map(e => {
        let a = this.ticketForm.get('ticket') as FormArray;

        let b = this.ticketFormInit.initTicketUnit()
        b.controls['ticket_type_id'].enable();
        const type_id = e.payload.doc.data().ticket_type.id
        this.ticketService.getTypeById(type_id).subscribe(type => {
          let ticket_type = (type.payload.data() as Types)?.ticket_type
          if (!ticket_type) {
            ticket_type = 'not selected'
          }
          let ss = {
            id: e.payload.doc.id, ...e.payload.doc.data() as Ticket,
            ticket_type: ticket_type
          }
          b.patchValue(ss);
          a.push(b);
          return ss;
        })
      })
    })
  }

  filterByFromDate(fromDate: any) {
    // const dRef = this.afs.collection('Tickets').ref
    // const qbRef = querybase.ref(dRef, [fromDate])
    // qbRef.push({from_date: fromDate});
    // const re = qbRef.where({from_date:fromDate})
    // qbRef.on('value', snap => console.log)
    this.fromDateFilter$.next(fromDate);
  }

  filterByToDate(toDate: any) {
    this.toDateFilter$.next(toDate);
  }

  filterByInbound(inbound: any) {
    this.inbound$.next(inbound);
  }
}
