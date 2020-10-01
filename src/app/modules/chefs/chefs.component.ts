import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Chef } from './../../core/models/chef.model'
import { ChefsService } from './../../core/services/chefs.service';
import { MatDialog } from "@angular/material/dialog";
import { NewChefComponent } from './new-chef/new-chef.component';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  private httpRequest: Subscription
  Chefs: Chef[]
  hasError: boolean = false

  constructor(
    private chefsService: ChefsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllChefs();
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllChefs(): void {
    this.httpRequest = this.chefsService.findAllChefs().subscribe(response => {
      // Sucesso da requisição
      this.Chefs = response.body['data']
    }, err => {
      // Erro na requisição
      this.hasError = true
    })
  }

  openNewChefModal(): void {
    const dialogRef = this.dialog.open(NewChefComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newChefsAdded => {
      if (newChefsAdded) {
        this.Chefs = undefined
        this.findAllChefs()
      }
    })
  }


}
