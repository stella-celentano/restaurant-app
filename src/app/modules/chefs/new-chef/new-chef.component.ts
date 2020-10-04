import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from "@angular/material/dialog"
import { Subscription } from "rxjs";
import { Restaurant } from './../../../core/models/restaurant.model'
import { RestaurantsService } from './../../../core/services/restaurants.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { ChefsService } from './../../../core/services/chefs.service'
import { RestaurantValidator } from './../../../core/validators/restaurant.validator'
import { ChefValidator } from './../../../core/validators/chef.validator'

@Component({
  selector: 'app-new-chef',
  templateUrl: './new-chef.component.html',
  styleUrls: ['./new-chef.component.css']
})
export class NewChefComponent implements OnInit {

  private httpRequest: Subscription

  restaurantFormGroup: FormGroup
  isNewRestaurant: boolean = false
  restaurants: Restaurant[]
  stepChefLabel: String = 'Restaurante'
  chefFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private restaurantsService: RestaurantsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private chefService: ChefsService,
    private dialogRef: MatDialogRef<NewChefComponent>,
    private restaurantValidator: RestaurantValidator,
    private chefValidator: ChefValidator
  ) { }

  ngOnInit(): void {
    this.findAllRestaurants()
    this.initializeSelectRestaurantFormGroup()
    this.initializeChefFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllRestaurants(): void {
    this.httpRequest = this.restaurantsService.findAllRestaurants().subscribe(response => {
      this.restaurants = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectRestaurantFormGroup(): void {
    this.restaurantFormGroup = this.builder.group({
      restaurant: this.builder.control(null, [Validators.required])
    })
  }

  initializeChefFormGroup(): void {
    this.chefFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.chefValidator.validatorUniqueChefName()),
      city: this.builder.control(null, [Validators.required]),
      education: this.builder.control(null),
      imagem: this.builder.control(null),
      restaurant: this.builder.control(null, [Validators.required])
    })
  }

  initializeRestaurantFormGroup(): void {
    this.restaurantFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.restaurantValidator.validatorUniqueRestaurantName()),
      contact: this.builder.control(null, [Validators.required]),
      city: this.builder.control(null, [Validators.required]),
      address: this.builder.control(null, [Validators.required]),
      typeFood: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  newRestaurant(): void {
    this.isNewRestaurant = !this.isNewRestaurant
    this.initializeRestaurantFormGroup()
  }

  selectRestaurant(): void {
    this.isNewRestaurant = !this.isNewRestaurant
    this.findAllRestaurants()
    this.initializeRestaurantFormGroup()
  }

  nextStep(): void {
    if (this.isNewRestaurant) {
      this.createNewRestaurant(this.restaurantFormGroup.value)
    } else {
      this.chefFormGroup.controls['restaurant'].setValue(this.restaurantFormGroup.value['restaurant']['_id'])
      this.stepChefLabel = `Restaurante: ${this.restaurantFormGroup.value['restaurant']['name']}`
    }
  }

  createNewRestaurant(formValueRestaurant: Restaurant): void {
    this.httpRequest = this.restaurantsService.createNewRestaurant(formValueRestaurant).subscribe(response => {
      this.chefFormGroup.controls['restaurant'].setValue(response.body['data']['_id'])
      this.stepChefLabel = `Restaurant: ${response.body['data']['name']}`
      this.toastr.showToastrSuccess(`O restaurante ${response.body['data']['name']} foi adicionado com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  createNewChef(): void {
    this.httpRequest = this.chefService.createNewChef(this.chefFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O chef ${response.body['data']['name']} foi adicionado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  chefNameExists(): boolean {
    return this.chefFormGroup.get('name').hasError('chefNameAlreadyExists')
  }

  restaurantNameExists(): boolean {
    return this.restaurantFormGroup.get('name').hasError('restaurantNameAlreadyExists')
  }


}
