import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"


import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatStepperModule } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"

import { ChefsRoutingModule } from './chefs-routing.module';
import { ChefsComponent } from './chefs.component';
import { ComponentsModule } from "./../../components/components.module";
import { NewChefComponent } from './new-chef/new-chef.component';
import { ChefCardComponent } from './chef-card/chef-card.component';
import { ChefDetailComponent } from './chef-detail/chef-detail.component';

@NgModule({
  declarations: [
    ChefsComponent,
    NewChefComponent, 
    ChefCardComponent, 
    ChefDetailComponent
  ],
  imports: [
    CommonModule,
    ChefsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class ChefsModule { }
