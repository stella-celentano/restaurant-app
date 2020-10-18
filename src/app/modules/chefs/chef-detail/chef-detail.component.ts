import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ChefsService } from "./../../../core/services/chefs.service";
import { Chef } from "./../../../core/models/chef.model";
import { MatDialog } from '@angular/material/dialog';
import { UpdateChefComponent } from '../update-chef/update-chef.component';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.css']
})
export class ChefDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Chef: Chef
  hasError: boolean = false
  chefName: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private chefsService: ChefsService,
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.chefName = this.activatedRoute.snapshot.params['chefName']
    this.findChefByName(this.chefName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findChefByName(chefName: String): void {
    this.httpRequest = this.chefsService.findChefByName(chefName).subscribe(response => {
      this.Chef = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openUpdateChefModal(): void {
    const dialogRef = this.dialog.open(UpdateChefComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      data: this.Chef
    })

    dialogRef.afterClosed().subscribe(updatedChef => {
      if (updatedChef) {
        this.Chef = undefined
        this.findChefByName(this.chefName)
      }
    })
  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '650px',
      height: '180px',
      disableClose: true,
      data: `Deseja apagar o Chef ${this.Chef['name']}? A ação é irreversível`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteChef(this.Chef['_id'])
      }
    })
  }

  deleteChef(chefID: String): void {
    this.httpRequest = this.chefsService.deleteChefById(chefID).subscribe(response => {
      this.toastr.showToastrSuccess(`O Chef ${this.Chef['name']} foi apagado com sucesso`)
      this.route.navigate(['/chefs'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
