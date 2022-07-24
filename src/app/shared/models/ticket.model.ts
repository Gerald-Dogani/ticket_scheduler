import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import remoteConfig = firebase.remoteConfig;
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";


export class Ticket {
  constructor(public inbound: string = '', public outbound: string = '',
              public ticket_type?: AngularFirestoreDocument , public ticket_type_id: string = '', public price: number = 0,
              public from_date: Timestamp = new Timestamp(0,0), public to_date: Timestamp = new Timestamp(0,0),
              public seat_number: number = 0) {
  }
}

export class Types {
  constructor(public id: string = '',public discount: number = 0, public hasDiscount: boolean = false,
              public price: number = 0, public ticket_type: string = '') {
  }
}
