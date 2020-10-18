import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RestaurantsService } from "./../../../core/services/restaurants.service";
import { Restaurant } from "./../../../core/models/restaurant.model";
import { MatDialog } from '@angular/material/dialog';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { UpdateRestaurantComponent } from './../update-restaurant/update-restaurant.component';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  private httpRequest: Subscription
  Restaurant: Restaurant
  hasError: boolean = false
  restaurantName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantsService: RestaurantsService,
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.restaurantName = this.activatedRoute.snapshot.params['restaurantName']
    this.findRestaurantByName(this.restaurantName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findRestaurantByName(restaurantName: String): void {
    this.httpRequest = this.restaurantsService.findRestaurantByName(restaurantName).subscribe(response => {
      this.Restaurant = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openUpdateChefModal(): void {
    const dialogRef = this.dialog.open(UpdateRestaurantComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      data: this.Restaurant
    })

    dialogRef.afterClosed().subscribe(updatedChef => {
      if (updatedChef) {
        this.Restaurant = undefined
        this.findRestaurantByName(this.restaurantName)
      }
    })
  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '650px',
      height: '180px',
      disableClose: true,
      data: `Deseja apagar o Restaurante ${this.Restaurant['name']}? A ação é irreversível`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteChef(this.Restaurant['_id'])
      }
    })
  }

  deleteChef(restaurantID: String): void {
    this.httpRequest = this.restaurantsService.deleteRestaurantById(restaurantID).subscribe(response => {
      this.toastr.showToastrSuccess(`O Restaurante ${this.Restaurant['name']} foi apagado com sucesso`)
      this.route.navigate(['/restaurants'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }


}
