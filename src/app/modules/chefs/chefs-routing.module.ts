import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefsComponent } from './chefs.component';
import { ChefDetailComponent } from './chef-detail/chef-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ChefsComponent
    },
    {
        path: 'detail/:chefName',
        component: ChefDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChefsRoutingModule { }