import { Component, OnInit } from '@angular/core';
import { Restaurant } from './../../../core/models/restaurant.model'

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sliceSinopses(value: String): String {
    return `${value.slice(0, 100)}...`
  }

}
