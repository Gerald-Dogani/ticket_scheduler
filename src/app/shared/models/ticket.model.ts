import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;


export class Ticket {
  constructor(public inbound: string = '', public outbound: string = '',
              public ticket_type: string = '', public ticket_type_id: string = '', public price: number = 0,
              public from_date: Timestamp = new Timestamp(0,0), public to_date: Timestamp = new Timestamp(0,0),
              public seat_number: number = 0) {
  }
}
