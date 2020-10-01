import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from './../../../core/models/restaurant.model'

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  @Input() Restaurant: Restaurant
  
  constructor() { }

  ngOnInit(): void {
  }

}
