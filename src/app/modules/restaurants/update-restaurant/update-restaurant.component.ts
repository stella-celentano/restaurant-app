import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from "rxjs";
import { RestaurantsService } from './../../../core/services/restaurants.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { Restaurant } from 'src/app/core/models/restaurant.model';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  restaurantFormGroup: FormGroup
  Restaurant: Restaurant

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Restaurant,
    private restaurantsService: RestaurantsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<UpdateRestaurantComponent>,
  ) { 
    this.Restaurant = data
  }

  ngOnInit(): void {
    this.initializeRestaurantFormGroup()
    this.populateRestaurantFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  initializeRestaurantFormGroup(): void {
    this.restaurantFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      contact: this.builder.control(null, [Validators.required]),
      city: this.builder.control(null, [Validators.required]),
      address: this.builder.control(null, [Validators.required]),
      typeFood: this.builder.control(null),
      imagem: this.builder.control(null)
    })
  }

  populateRestaurantFormGroup(): void {
    this.restaurantFormGroup.patchValue({
      name: this.Restaurant['name'],
      contact: this.Restaurant['contact'],
      city: this.Restaurant['city'],
      address: this.Restaurant['address'],
      typeFood: this.Restaurant['typeFood'],
      imagem: this.Restaurant['imagem']
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateRestaurant(): void {
    this.httpRequest = this.restaurantsService.updateRestaurantById(this.Restaurant['_id'], this.restaurantFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O restaurante ${this.Restaurant['name']} foi atualizado com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
