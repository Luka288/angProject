import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FetchProductsService } from '../shared/services/fetch-products.service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { every, tap } from 'rxjs';
import { Pagination, Product } from '../shared/interfaces';
import { PaginatorPageFixService } from '../shared/services/paginator-page-fix.service';
import { RouterLink } from '@angular/router';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ProductInfoService } from '../shared/services/product-info.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatPaginatorModule, CommonModule, RouterLink],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorPageFixService}],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export default class ShopComponent implements OnInit{

  private readonly httpRequest = inject(FetchProductsService)
  private readonly productRequest = inject(ProductInfoService)
  readonly loadedProducts: Product[] = []

  readonly config = {
    pageIndex: 1,
    pageSize: 10,
  };

  ngOnInit(): void {
    this.loadProducts(this.config.pageIndex, this.config.pageSize)
  }


  pageChanged(event: PageEvent){
    this.config.pageIndex = event.pageIndex;
    this.loadProducts(event.pageIndex, this.config.pageSize);
    if(event.pageIndex == 0){
      this.loadProducts(1, this.config.pageSize);
    }
    this.loadedProducts.splice(0, 10)
  }


  //!For exact product 
  productLoad(event: string){
    this.productRequest.loadProduct(event).pipe(tap((resp) => {
      console.log(event)
      console.log(resp)
    })).subscribe()
  }
  //!!!!

  
  loadProducts(pageIndex: number, pageSize: number){
    this.httpRequest.getProducts({
      pageIndex: pageIndex,
      pageSize: pageSize,
    }).pipe(tap((resp) => {
      this.loadedProducts.push(...resp.products)
    })).subscribe();
  }
  

}
