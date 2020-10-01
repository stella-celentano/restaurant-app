import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ChefsService } from "./../../../core/services/chefs.service";
import { Chef } from "./../../../core/models/chef.model";

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.css']
})
export class ChefDetailComponent implements OnInit {

  private httpRequest: Subscription
  Chef: Chef
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private chefsService: ChefsService
  ) { }

  ngOnInit(): void {
    const chefName = this.activatedRoute.snapshot.params['chefName']
    this.findChefByName(chefName)
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

}
