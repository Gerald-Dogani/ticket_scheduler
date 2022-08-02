import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TicketService} from "../services/ticket.service";
import {HotToastService} from "@ngneat/hot-toast";
import {TicketFormService} from "../services/ticket-form.service";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {Ticket, Types} from "@shared/models/ticket.model";
import {SnackBarService} from "@shared/services/snack-bar-service/snack-bar.service";
import {DateAdapter, MAT_DATE_FORMATS, ThemePalette} from "@angular/material/core";
import {CustomDateAdapter} from "@shared/entities/CustomDateAdapter";
import {scFormatDateTimeToTimeStamp} from "@shared/cons";
import {LoaderService} from "@core/components/loader/services/loader.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: DateAdapter, useClass: CustomDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: 'dd-MM-YYYY hh:mm:ss'},
  ]
})

export class FormComponent implements OnInit {
  createTicketForm: FormGroup = new FormGroup({})
  types: Types[] = [];
  color: ThemePalette = 'accent';
  returnUrl:string = '-/list';
  today = new Date();
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  stepHours = [1, 2, 3, 4, 5];
  stepMinutes = [1, 5, 10, 15, 20, 25];
  stepSeconds = [1, 5, 10, 15, 20, 25];

  constructor(public ticketService: TicketService, public loaderService: LoaderService, private snack: SnackBarService,
              public toast: HotToastService, public afs: AngularFirestore,
              public fb: FormBuilder, public ticketFormInit: TicketFormService, private dateAdapter: DateAdapter<Date>,
              private loader: NgxSpinnerService, private router: Router) {
    dateAdapter.setLocale('en-in');
  }

  ngOnInit(): void {
    this.initialData();
    this.createTicketForm = this.ticketFormInit.initTicketUnit(this.afs);
  }


  show($event: any) {
    this.createTicketForm.value['to_date'] = scFormatDateTimeToTimeStamp(this.createTicketForm.value['to_date']);
  }

  bookTicket(): void {
    this.loader.show();
    const ticket_type_id = this.createTicketForm.controls['ticket_type_id'].value
    const data = Object.assign({}, this.createTicketForm.value, Ticket, {ticket_type_id: ticket_type_id})
    data.ticket_type = '/types/' + data.ticket_type
    this.ticketService.addTicket(data).then(res => {
        delete data.ticket_type_id;
        delete data.id;
        res.update({ticket_type_id: ticket_type_id + '_' + res.id, id: res.id, ...data})
      }
    ).finally(() => {
      this.loader.hide();
      this.snack.onSuccess('Booked successfully')
    })


    // this.ticketService.addTypes({discount:10, hasDiscount:true, price:200, ticket_type: 'ECONOMICPROMO'})
  }

  patchPrice(obj: Types) {
    let final_price = 0;
    this.createTicketForm.controls['price'].setValue(0)
    if (obj.hasDiscount) {
      const discount = (obj.price * obj.discount) / 100;
      final_price = obj.price - discount;
    } else if (!obj.hasDiscount) {
      final_price = obj.price
    }
    this.createTicketForm.controls['price'].setValue(final_price);
    this.createTicketForm.controls['ticket_type_id'].setValue(obj.ticket_type);
  }

  initialData(): void {
    this.ticketService.getTicketTypes().subscribe({
      next: (response) => {
        this.types = response.map(data => {
          const type = {...data.payload.doc.data()}
          type.id = data.payload.doc.id;
          return type
        });
        console.log(this.types)
      },
      error: (error) => {
        this.snack.onError(error);
      }
    })
  }

  goTo():void{
    this.router.navigate([this.returnUrl]).then();
  }


}
