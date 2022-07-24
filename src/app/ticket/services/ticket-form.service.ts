import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {scFormatDateTimeToTimeStamp} from "@shared/cons";

@Injectable({
  providedIn: 'root'
})
export class TicketFormService {

  constructor(public fb: FormBuilder) {
  }

  initTicketUnit(): FormGroup {
    const date: Date = new Date()
    return this.fb.group({
      id: new FormControl(null),
      inbound: new FormControl('Somewhere'),
      outbound: new FormControl('Somewhere'),
      ticket_type: new FormControl(null),
      ticket_type_id: new FormControl({value:null, disabled:true}),
      price: new FormControl(null),
      from_date: new FormControl(null),
      to_date: new FormControl(null),
      seat_number: new FormControl('123'),
      created_date: new FormControl(scFormatDateTimeToTimeStamp(date)),
    })
  }
}
