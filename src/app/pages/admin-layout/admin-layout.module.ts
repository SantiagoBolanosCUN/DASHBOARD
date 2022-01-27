import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { IonicModule } from '@ionic/angular';

import { AdminLayoutPageRoutingModule } from './admin-layout-routing.module';

import { AdminLayoutPage } from './admin-layout.page';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    IonicModule,
    AdminLayoutPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [AdminLayoutPage, NavbarComponent],
})
export class AdminLayoutPageModule {}
