import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { everrestService } from '../const';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  private readonly httpGet = inject(HttpClient);

  readonly PRODUCT_API = everrestService

  loadProduct(id: string){
    return this.httpGet.get(`${this.PRODUCT_API}/shop/products/id/${id}`)
  }
}
