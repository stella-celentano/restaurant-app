import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { RestaurantsService } from './../services/restaurants.service';

@Injectable({
    providedIn: 'root'
})
export class RestaurantValidator {

    constructor(
        private restaurantsService: RestaurantsService
    ) { }

    validatorUniqueRestaurantName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.restaurantsService.validatorUniqueRestaurantName(value)),
                map((response) => {
                    if (response['data'] == 0 && control.value != null && control.value != '') {
                        return null
                    } else {
                        return { 'restaurantNameAlreadyExists': true }
                    }
                }),
                first()
            )
    }
}