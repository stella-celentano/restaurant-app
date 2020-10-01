import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from "@angular/material/dialog"
import { Subscription } from "rxjs";
import { Chef } from './../../../core/models/chef.model'
import { RestaurantsService } from './../../../core/services/restaurants.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { ChefsService } from './../../../core/services/chefs.service'
import { RestaurantValidator } from './../../../core/validators/restaurant.validator'
import { ChefValidator } from './../../../core/validators/chef.validator'


@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  private httpRequest: Subscription

  restaurantFormGroup: FormGroup
  isNewChef: boolean = false
  chefs: Chef
  stepRestaurantLabel: String = 'Chef'
  chefFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private restaurantsService: RestaurantsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private chefService: ChefsService,
    private dialogRef: MatDialogRef<NewRestaurantComponent>,
    private restaurantValidator: RestaurantValidator,
    private chefValidator: ChefValidator
  ) { }

  ngOnInit(): void {
    this.findAllChefs()
    this.initializeSelectChefFormGroup()
    this.initializeRestaurantFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllChefs(): void {
    this.httpRequest = this.chefService.findAllChefs().subscribe(response => {
      this.chefs = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectChefFormGroup(): void {
    this.chefFormGroup = this.builder.group({
      chef: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewChefFormGroup(): void {
    this.chefFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.chefValidator.validatorUniqueChefName()),
      city: this.builder.control(null, [Validators.required]),
      education: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  initializeRestaurantFormGroup(): void {
    this.restaurantFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.restaurantValidator.validatorUniqueRestaurantName()),
      contact: this.builder.control(null, [Validators.required]),
      city: this.builder.control(null, [Validators.required]),
      address: this.builder.control(null, [Validators.required]),
      typeFood: this.builder.control(null),
      imagem: this.builder.control(null),
      chef: this.builder.control(null, [Validators.required])
    })
  }

  newChef(): void {
    this.isNewChef = !this.isNewChef
    this.initializeNewChefFormGroup()
  }

  selectChef(): void {
    this.isNewChef = !this.isNewChef
    this.findAllChefs()
    this.initializeSelectChefFormGroup()
  }

  nextStep(): void {
    if (this.isNewChef) {
      this.createNewChef(this.chefFormGroup.value)
    } else {
      this.restaurantFormGroup.controls['chef'].setValue(this.chefFormGroup.value['chef']['_id'])
      this.stepRestaurantLabel = `Chef: ${this.chefFormGroup.value['chef']['name']}`
    }
  }

  createNewChef(formValueChef: Chef): void {
    this.httpRequest = this.chefService.createNewChef(formValueChef).subscribe(response => {
      this.restaurantFormGroup.controls['chef'].setValue(response.body['data']['_id'])
      this.stepRestaurantLabel = `Chef: ${response.body['data']['name']}`
      this.toastr.showToastrSuccess(`O chef ${response.body['data']['name']} foi adicionado com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  createNewRestaurant(): void {
    this.httpRequest = this.restaurantsService.createNewRestaurant(this.restaurantFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O restaurante ${response.body['data']['name']} foi adicionado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      console.log(this.restaurantFormGroup.value)
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

