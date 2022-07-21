import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TicketFormService {

  constructor(public fb: FormBuilder) {
  }

  initTicketUnit(): FormGroup {
    return this.fb.group({
      id: new FormControl(null),
      inbound: new FormControl(null),
      outbound: new FormControl(null),
      ticket_type: new FormControl(null),
      ticket_type_id: new FormControl(null),
      price: new FormControl(null),
      from_date: new FormControl(null),
      to_date: new FormControl(null),
      seat_number: new FormControl(null)
    })
  }
}
