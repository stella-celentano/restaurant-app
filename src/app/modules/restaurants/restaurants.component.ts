import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Restaurant } from './../../core/models/restaurant.model'
import { RestaurantsService } from "./../../core/services/restaurants.service";
import { MatDialog } from "@angular/material/dialog";
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  private httpRequest: Subscription
  Restaurants: Restaurant[]
  hasError: boolean = false

  constructor(
    private restaurantsService: RestaurantsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllRestaurants();
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllRestaurants(): void {
    this.httpRequest = this.restaurantsService.findAllRestaurants().subscribe(response => {
      // Sucesso da requisição
      this.Restaurants = response.body['data']
    }, err => {
      // Erro na requisição
      this.hasError = true
    })
  }

  openNewRestaurantModal(): void {
    const dialogRef = this.dialog.open(NewRestaurantComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newRestaurantAdded => {
      if (newRestaurantAdded) {
        this.Restaurants = undefined
        this.findAllRestaurants()
      }
    })
  }

}
