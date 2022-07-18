import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatNativeDateModule} from "@angular/material/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import * as fromComponents from '@core/components';
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";


const MaterialModules = [
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTabsModule,
  FlexLayoutModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule,
    ...MaterialModules
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core Module is already loaded. Import it in the AppModule only');
    }
  }
}
