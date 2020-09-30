import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { ChefsService } from './../services/chefs.service';

@Injectable({
    providedIn: 'root'
})
export class ChefValidator {

    constructor(
        private chefsService: ChefsService
    ) { }

    validatorUniqueChefName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.chefsService.validatorUniqueChefName(value)),
                map((response) => {
                    if (response['data'] == 0 && control.value != null && control.value != '') {
                        return null
                    } else {
                        return { 'chefNameAlreadyExists': true }
                    }
                }),
                first()
            )
    }
}