import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    LoadingComponent,
    ErrorComponent
  ]
})
export class ComponentsModule { }
