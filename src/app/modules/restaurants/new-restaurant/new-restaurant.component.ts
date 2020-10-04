import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from "@angular/material/dialog"
import { Subscription } from "rxjs";
import { RestaurantsService } from './../../../core/services/restaurants.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { RestaurantValidator } from './../../../core/validators/restaurant.validator'


@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  private httpRequest: Subscription

  restaurantFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private restaurantsService: RestaurantsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<NewRestaurantComponent>,
    private restaurantValidator: RestaurantValidator,
  ) { }

  ngOnInit(): void {
    this.initializeRestaurantFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
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

  createNewRestaurant(): void {
    this.httpRequest = this.restaurantsService.createNewRestaurant(this.restaurantFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O restaurante ${response.body['data']['name']} foi adicionado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  restaurantNameExists(): boolean {
    return this.restaurantFormGroup.get('name').hasError('restaurantNameAlreadyExists')
  }

}

