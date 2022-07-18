import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FirebaseError} from "@shared/entities/ErrorInterface";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  returnUrl:string = '-';

  constructor(private loader: NgxSpinnerService, private snackBar: MatSnackBar, private router: Router) { }


  onSuccess(message?:string): void {
    this.loader.show();
    this.snackBar.open(message? message : 'Action finish with success!', 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
    this.router.navigate([this.returnUrl]).then();
  }

  onError(error: FirebaseError) {
    this.loader.hide();
    console.log(error)
    if (error.errors){
      this.snackBar.open(error.message, `Close`, {duration: 5000});
    }else{
      this.snackBar.open(error.message, `Close`, {duration: 5000});
      // this.errorHandler.organizeServerErrors(error.errors, this.legalCaseForm, this.errors);
    }  }


}
