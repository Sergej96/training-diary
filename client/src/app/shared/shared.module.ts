import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ArrayMapPipe } from '../pipes/array-map.pipe';
import { InputNumberComponent } from './components/input-number/input-number.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LeftMenuComponent,
        LoaderComponent,
        CalendarComponent,
        ArrayMapPipe,
        InputNumberComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LeftMenuComponent,
        LoaderComponent,
        CalendarComponent,
        InputNumberComponent,
        ArrayMapPipe,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class ShareModule { }
