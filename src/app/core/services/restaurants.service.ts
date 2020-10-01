import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { Restaurant } from "./../models/restaurant.model"
import { API_URL } from "./../api"

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  findAllRestaurants(): Observable<HttpResponse<Restaurant[]>> {
    return this.http.get<Restaurant[]>(`${API_URL}/restaurant/getAllRestaurants`, { observe: 'response' })
  }

  findRestaurantByName(restaurantName: String): Observable<HttpResponse<Restaurant>> {
    return this.http.get<Restaurant>(`${API_URL}/restaurant/getOne/${restaurantName}`, { observe: 'response' })
  }

  createNewRestaurant(body: Restaurant): Observable<HttpResponse<Restaurant>> {
    return this.http.post<Restaurant>(`${API_URL}/restaurant/createRestaurant`, body, { observe: 'response' })
  }

  validatorUniqueRestaurantName(restaurantName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('nome', restaurantName)
    return this.http.get<any>(`${API_URL}/restaurant/validarNomeRestaurant`, { params: myParams })
  }
}
