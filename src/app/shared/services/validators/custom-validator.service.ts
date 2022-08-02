import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AbstractControl} from "@angular/forms";
import {debounceTime, map, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {
  static  inbound(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const  inbound = control.value.toLowerCase();
      return afs.collection('Tickets', ref => ref.where('inbound', '==', inbound)).valueChanges().pipe(
        debounceTime(500),
        take(1),
        map(arr => arr.length? {inboundAvailable: false}: null)
      )
    }
  }
}
