import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChefComponent } from './new-chef/new-chef.component';
import { ChefCardComponent } from './chef-card/chef-card.component';
import { ChefDetailComponent } from './chef-detail/chef-detail.component';



@NgModule({
  declarations: [NewChefComponent, ChefCardComponent, ChefDetailComponent],
  imports: [
    CommonModule
  ]
})
export class ChefsModule { }
