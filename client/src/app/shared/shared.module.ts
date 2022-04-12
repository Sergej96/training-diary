import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LeftMenuComponent,
        LoaderComponent
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
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class ShareModule { }
