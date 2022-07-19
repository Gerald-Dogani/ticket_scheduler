import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface TicketInt {
  inbound: string;
  outbound: string;
  ticket_type: string
  ticket_type_id: string;
  price: number;
  from_date: Timestamp;
  to_date: Timestamp;
  seat_number: number;
}
