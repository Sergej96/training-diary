import { NgModule } from "@angular/core";

//Angular Material Components
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    exports: [
      MatCheckboxModule,
      MatButtonModule,
      MatInputModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatSelectModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatCardModule,
      MatExpansionModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatDialogModule,
      MatTooltipModule,
      MatTableModule,
      MatSnackBarModule,
      MatNativeDateModule,
      MatGridListModule
    ],
    providers: [{
      provide: MAT_DATE_LOCALE, useValue: 'ru-RU'
    }]
})
export class MaterialModule{}
