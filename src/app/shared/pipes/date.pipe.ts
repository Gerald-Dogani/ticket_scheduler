import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {formatDate} from "@angular/common";

@Pipe({
  name: 'dateFormat'
})
export class DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(timestamp: Timestamp, format?: string): string {
    if (!timestamp?.toDate) {
      return '-';
    }
    return formatDate(timestamp.toDate(), format || 'medium', this.locale);
  }
}
