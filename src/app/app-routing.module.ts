import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
    },
    {
        path: 'restaurants',
        loadChildren: () => import('./modules/restaurants/restaurants.module').then(module => module.RestaurantsModule)
    },
    {
        path: 'chefs',
        loadChildren: () => import('./modules/chefs/chefs.module').then(module => module.ChefsModule)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }