import { Routes } from '@angular/router';
import AuthPageComponent from './features/auth-page/auth-page.component';
import { canActivate, canUserAuth } from './features/shared/services/auth-service.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component'),
        title: 'მთავარი გვერდი',
    },

    {
        path: 'product/id/:id',
        loadComponent: () => import('./features/product-page/product-page.component'),
        title: 'Product',
      },

    {
        path: 'auth',
        loadComponent: () => import('./features/auth-page/auth-page.component'),
        title: 'შესვლა/რეგისრტაცია',
        canActivate: [canUserAuth],
    },
    {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component'),
        title: 'მაღაზიის ფეიჯი',
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component'),
        title: 'პროფილი',
        canActivate: [canActivate],
    },
    {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component'),
        title: 'გვერდი ვერ მოიძებნა',
    },
];
