import {NativeDateAdapter} from '@angular/material/core';
import {Injectable} from '@angular/core';


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override useUtcForDisplay = true;

  // override format(date: Date): string {
  //   return date.format('DD/MM/YYYY');
  // }

}
