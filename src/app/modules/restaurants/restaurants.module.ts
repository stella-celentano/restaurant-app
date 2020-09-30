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

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ComponentsModule } from "./../../components/components.module";
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component'


@NgModule({
  declarations: [
    RestaurantsComponent,
    NewRestaurantComponent,
    RestaurantDetailComponent,
    RestaurantCardComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class RestaurantsModule { }
