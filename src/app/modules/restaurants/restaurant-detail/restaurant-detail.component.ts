import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RestaurantsService } from "./../../../core/services/restaurants.service";
import { Restaurant } from "./../../../core/models/restaurant.model";

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  private httpRequest: Subscription
  Restaurant: Restaurant
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit(): void {
    const restaurantName = this.activatedRoute.snapshot.params['restaurantName']
    this.findRestaurantByName(restaurantName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findRestaurantByName(restaurantName: String): void {
    this.httpRequest = this.restaurantsService.findRestaurantByName(restaurantName).subscribe(response => {
      this.Restaurant = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

}
