import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chef } from 'src/app/core/models/chef.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Restaurant } from 'src/app/core/models/restaurant.model';
import { RestaurantsService } from 'src/app/core/services/restaurants.service';
import { ChefsService } from 'src/app/core/services/chefs.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-update-chef',
  templateUrl: './update-chef.component.html',
  styleUrls: ['./update-chef.component.css']
})
export class UpdateChefComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription

  Chef: Chef
  chefFormGroup: FormGroup
  restaurants: Restaurant[]

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Chef,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateChefComponent>,
    private restaurantsService: RestaurantsService,
    private chefsService: ChefsService,
    private toastr: MyToastrService
  ) {
    this.Chef = data
  }

  ngOnInit(): void {
    this.findAllRestaurants()
    this.initializeChefFormGroup()
    this.populateChefFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllRestaurants(): void {
    this.httpRequest = this.restaurantsService.findAllRestaurants().subscribe(response => {
      this.restaurants = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeChefFormGroup(): void {
    this.chefFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      city: this.builder.control(null, [Validators.required]),
      education: this.builder.control(null),
      imagem: this.builder.control(null),
      restaurant: this.builder.control(null, [Validators.required])
    })
  }

  populateChefFormGroup(): void {
    this.chefFormGroup.patchValue({
      name: this.Chef['name'],
      city: this.Chef['city'],
      education: this.Chef['education'],
      imagem: this.Chef['imagem'],
      restaurant: this.Chef['restaurant']
    })
  }

  compareRestaurant(d1: Restaurant, d2: Restaurant): boolean {
    return d1 && d2 ? d1._id === d2._id : d1 === d2
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateChef(): void {
    this.httpRequest = this.chefsService.updateChefById(this.Chef['_id'], this.chefFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O chef ${this.Chef['name']} foi atualizado com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }
}
