import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../components/account/components/menu/menu.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        LoaderComponent,
        MaterialModule,
        CommonModule
    ]
})

export class ShareModule { }
