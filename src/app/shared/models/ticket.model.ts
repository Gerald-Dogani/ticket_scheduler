export class Ticket {
  constructor(public id: number = 0, public inbound: string = '', public outbound: string = '',
              public ticket_type: string = '', public ticket_type_id: string = '', public price: string = '',
              public from_date: Date = new Date(), public to_date: Date = new Date(), public seat_number: number = 0) {
  }
}
