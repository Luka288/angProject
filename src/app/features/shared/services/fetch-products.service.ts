import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PageDetails, Pagination, Product } from '../interfaces';
import { API, everrestService } from '../const';

@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {

  private readonly request = inject(HttpClient)

readonly EVERREST_API = API;

  getProducts(Pagination: PageDetails){
    return this.request.get<Pagination>(`${this.EVERREST_API}/shop/products/all?page_index=${Pagination.pageIndex}&page_size=${Pagination.pageSize}`)
  }

  loadProductByID(id: String){
    return this.request.get<Product>(`${this.EVERREST_API}/shop/products/id/${id}`)
  }
}
